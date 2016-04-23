import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BetterDate = ({ date, betterDates }) => (
  <div>
    No incidents happened on {date.format('LL')}, how about trying the following:
      {betterDates.map((x) =>
        <Link key={x} to={`/date/${x.format('YYYY-MM-DD')}`}>
          {x.format('LL')}
        </Link>
      )}
  </div>
);

BetterDate.propTypes = {
  date: PropTypes.object.isRequired,
  betterDates: PropTypes.array.isRequired
};

export default BetterDate;
