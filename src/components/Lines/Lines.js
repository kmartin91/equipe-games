import React from 'react';
import './Lines.scss';

// API <Lines>{lines}</Lines>, where lines is an array of strings
const Lines = ({ children }) => {
  const El = ({ children }) => <span className="Lines__LineItalic">{children}</span>;
  let danglingItalic = false;
  const theLines = children.reduce((acc, line, index) => {
    const parts = line.split('"');
    let theLine = '';
    // either " at beginning or end
    if (parts.length === 2) {
      // " at beginning
      if (parts[0] === '') {
        danglingItalic = true;
        theLine = <El key={`line-dangl-${index}`}>"{parts[1]}</El>;
      }
      // " at end
      if (parts[1] === '') {
        danglingItalic = false;
        theLine = <El key={`line-not-dangling-${index}`}>{parts[0]}"</El>;
      }
    } else if (parts.length === 1) {
      // no "
      // but maybe italic because of DANGLING El
      theLine = danglingItalic ? <El key={`line-dangling-${index}`}>{parts[0]}</El> : parts[0];
    } else {
      // multiple "
      theLine = (
        <>
          {parts.map((part, i) => {
            if ((i + 1) % 2 === 0) {
              return <El key={i}>"{part}"</El>;
            }
            return part;
          })}
        </>
      );
    }
    return [...acc, <p key={`line-${index}`}>{theLine}</p>];
  }, []);
  return <div className="Lines">{theLines}</div>;
};

export default Lines;
