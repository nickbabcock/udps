#!/bin/bash
# This script will request incident data from the university's site up to
# PREVIOUS_DAYS ago and save each response as a file under DIR. After all
# PREVIOUS_DAYS requests are fulfilled, the script will aggregate all data (not
# just PREVIOUS_DAYS) into a single json file via jq.
#
# To get the most of this script, place it in cron, executing 9am everyday as
# the incident log states that "Information is generally available by 9:00am
# each weekday."

PREVIOUS_DAYS=$(seq 1 ${1})
DIR="dps-json"
mkdir -p ${DIR}

for i in ${PREVIOUS_DAYS}; do
    day=$(date -d "-${i} day" +'%m/%d/%Y');
    echo "Requesting ${day}"
    dir_day="$(date -d "-${i} day" +'%m-%d-%Y.json')";

    # Poor man's retry, as the server may give a non-ok status code
    for j in {1..5}; do
        curl -f -s http://www.dpss.umich.edu/api/GetCrimeLogCache?date=${day} > "${DIR}/${dir_day}" && break;
        sleep 15;
    done
done;

JSON_FILES=$(ls "${DIR}"/*.json)

JQ_QUERY=()
for i in $(seq 1 $(ls "${DIR}"/*.json | wc -l)); do
    JQ_QUERY+=(".[${i}].data")
done;
JQ_QUERY=$(printf "%s\n" ${JQ_QUERY[@]} | paste -sd '+')

jq -c -s "${JQ_QUERY}" ${JSON_FILES} > data.json
