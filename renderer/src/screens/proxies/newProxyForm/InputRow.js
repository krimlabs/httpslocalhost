import React from 'react';

import Input from 'components/ui/Input';

const InputRow = ({icon, label, placeholder, value, onChange, error}) => {
  return (<div className="cf relative pr2" style={{zIndex: 1}}>
    <div className="w-30 fl tc pt2">
      <div className="fr pr1">
        <img src={icon} alt="" className="h1 mr1"/> 
        <div className="dib fr">{label}</div>
      </div>
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