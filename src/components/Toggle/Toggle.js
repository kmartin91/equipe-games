import React, { useState } from 'react';
import classnames from 'classnames';

import './Toggle.scss';

const Toggle = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="Toggle">
      <div className="Toggle__Header">
        {tabs &&
          tabs.map(({ title }, index) => (
            <button
              className={classnames('Toggle__HeaderButton', {
                Toggle__HeaderButton_Active: index === currentTab,
              })}
              key={`${index}-toggleheader`}
              onClick={() => setCurrentTab(index)}
            >
              {title}
            </button>
          ))}
      </div>

      <div className="Toggle__Content">
        {tabs &&
          tabs.map(({ content }, index) => {
            return (
              <div
                key={`${index}-togglecontent`}
                className={classnames('Toggle__ContentChildren', {
                  Toggle__ContentChildre_Show: index === currentTab,
                })}
              >
                {' '}
                {content}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Toggle;
