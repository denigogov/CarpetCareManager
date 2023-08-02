import { useState } from 'react';
import '../../sass/delivery/_searchOrderNav.scss';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchOrderNav = ({
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  orderStatus,
  setSearchByStatus,
  setInputSearchValue,
}) => {
  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="searchOrder--container">
      <nav>
        <ul>
          <li>
            <input
              type="search"
              placeholder="search for order"
              className="input-search"
              onChange={e => setInputSearchValue(e.target.value)}
            />
          </li>

          <li>
            <DatePicker
              renderCustomHeader={({
                monthDate,
                customHeaderCount,
                decreaseMonth,
                increaseMonth,
              }) => (
                <div>
                  <button
                    aria-label="Previous Month"
                    className={
                      'react-datepicker__navigation react-datepicker__navigation--previous'
                    }
                    style={
                      customHeaderCount === 1 ? { visibility: 'hidden' } : null
                    }
                    onClick={decreaseMonth}
                  >
                    <span
                      className={
                        'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                      }
                    >
                      {'<'}
                    </span>
                  </button>
                  <span className="react-datepicker__current-month">
                    {monthDate.toLocaleString(navigator.language, {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <button
                    aria-label="Next Month"
                    className={
                      'react-datepicker__navigation react-datepicker__navigation--next'
                    }
                    style={
                      customHeaderCount === 0 ? { visibility: 'hidden' } : null
                    }
                    onClick={increaseMonth}
                  >
                    <span
                      className={
                        'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                      }
                    >
                      {'>'}
                    </span>
                  </button>
                </div>
              )}
              onChange={handleChange}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              monthsShown={2}
            />
          </li>

          <li>
            <select onChange={e => setSearchByStatus(e.target.value)}>
              <option value="all">search by status</option>
              {orderStatus.map(status => {
                return <option key={status.id}>{status.status_name}</option>;
              })}
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SearchOrderNav;
