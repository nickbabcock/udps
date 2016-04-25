import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const BetterDate = ({ date, betterDates }) => (
  <div>
    No incidents happened on {date.format('LL')}, how about trying the following:&nbsp;
      {betterDates.map((x, i) => {
        if (i === betterDates.length - 1) {
          return (
            <Link key={x} to={`/date/${x.format('YYYY-MM-DD')}`}>
              {x.format('LL')}
            </Link>
          );
        } else {
          return (
            <span>
              <Link key={x} to={`/date/${x.format('YYYY-MM-DD')}`}>
                {x.format('LL')}
              </Link>
              <span> and </span>
            </span>
          );
        }
      })}
  </div>
);

BetterDate.propTypes = {
  date: PropTypes.object.isRequired,
  betterDates: PropTypes.array.isRequired
};

export default BetterDate;
