import React from 'react';

const Testimony = ({title, body, name, designation, avatar, marginTop}) => {
  return (<div className="w-100 fl-ns pa4 w-33-ns">
    <div className="pa3 ba b--black-10 br2">
      <div className="" dangerouslySetInnerHTML={{__html: body}} />
    </div>
    <div className="cf f6">
      <div className="fl w-30 tr">
        <img
          src={avatar}
          alt={`Photo of ${name}`}
          className="h3 w3 br-100 bg-gray shadow-2 ba b--white"
          style={{marginTop: -8}}
        />
      </div>
      <div className="fl w-70 pl2 pt2">
        <div className="b f5 mb1">{name}</div>
        <div>{designation}</div>
      </div>
    </div>
  </div>);
};

export default Testimony;
