import React from 'react';

import Input from 'components/ui/Input';

const InputRow = ({icon, label, placeholder, value, onChange, error}) => {
  return (<div className="cf relative pr2" style={{zIndex: 1}}>
    <div className="fl w-10 tc pt2">
      <img src={icon} alt="" className="h1"/> 
    </div>
    <div className="fl w-20 pt2">
      {label}
    </div>
    <div className="fl w-70">
      <Input
        className="pt1"
        inputStyle={{padding: '4px 8px'}}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
      />
    </div>
  </div>)
};

export default InputRow;