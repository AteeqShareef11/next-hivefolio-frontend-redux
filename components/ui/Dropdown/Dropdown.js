import React from 'react';
import {useState} from 'react';

const Dropdown = ({ selected, setSelected }) => {

  const [isActive, setIsActive] = useState(false);
  const options = ["React", "Vue", "Angular"];

  return (
    <div className="px-4 py-5">
      {/* Dropdown */}
      <div className="bg-white border-2 border-dark border-solid p-4">
        <div className="" onClick={(e) => setIsActive(!isActive)}>
          {selected}
        </div>
        {isActive && (
          <div>
            {options.map(option => {
              <div
                onClick={e => {
                  setSelected(option);
                  setIsActive(false);
                }}
                className=""
              >
                {option}
              </div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown