import React from 'react';

const Row = ({left, right}) => {
  return (<div className="cf mt3">
    <div className="w-80 fl b dim tr">{left}</div>
    <div className="w-20 fl">{right}</div>
  </div>);
};

export default Row;
