import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RawIncident, ReportedIncident } from "./types";
import { formatDate, todaysDate } from "./dates";
import { useRouter } from "next/router";
import { IncidentCard } from "./IncidentCard";

const firstItem = (x: string | string[] | undefined): string | undefined => {
  if (Array.isArray(x)) {
    return x[0];
  } else {
    return x;
  }
};

export const Incidents: React.FC<{}> = () => {
  const router = useRouter();
  const initialDay = firstItem(router.query.date) || todaysDate();
  const [selectedDate, setSelectedDate] = useState<string>(initialDay);
  const [incidents, setIncidents] = useState<ReportedIncident[]>([]);

  useEffect(() => {
    async function effect() {
      const res = await import("../../assets/app.json");
      const json = res.default as RawIncident[];
      const reports = json.map((x) => ({
        ...x,
        date: new Date(x.date),
      }));
      setIncidents(reports);
    }

    effect();
  }, []);

  const selectedIncidents = useMemo(() => {
    const date = new Date(selectedDate || "");
    return incidents.filter(
      (x) =>
        x.date.getFullYear() == date.getFullYear() &&
        x.date.getMonth() == date.getMonth() &&
        x.date.getDate() == date.getDate()
    );
  }, [incidents, selectedDate]);

  const lastIncidentDate = useMemo(() => {
    if (selectedIncidents.length == 0 && incidents.length > 0) {
      const date = incidents[incidents.length - 1].date;
      return formatDate(date);
    } else {
      return null;
    }
  }, [incidents, selectedIncidents]);

  useEffect(() => {
    setSelectedDate(firstItem(router.query.date) || todaysDate());
  }, [router.query.date]);

  const handleSelectedDate = (date: string) => {
    router.push(`/date/${date}`, undefined, { shallow: true });
  };

  return (
    <div className="incidents">
      <div>
        <label htmlFor="incident-date">Date of Incident:</label>
        <input
          id="incident-date"
          value={selectedDate}
          type="date"
          onChange={(e) => handleSelectedDate(e.target.value)}
        />
      </div>
      {lastIncidentDate && (
        <div>
          No incidents reported for {selectedDate}. Try:{" "}
          <Link href={`/date/${lastIncidentDate}`}>
            <a>{lastIncidentDate}</a>
          </Link>
        </div>
      )}
      {selectedIncidents.length > 0 && (
        <div className="card-list">
          {selectedIncidents.map((incident) => (
            <IncidentCard key={incident.id} {...incident}/>
          ))}
        </div>
      )}
      <style jsx>{`
        label + input {
          margin-left: 8px;
        }

        .card-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .incidents {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};
