import React from 'react';
import {Animated} from "react-animated-css";

const Benefit = ({imgSrc, title, body, marginTop}) => {
  return (<div className="w-100 w-25-ns fl-ns pa4">
    <Animated animationIn={"fadeInUp"} invisible={true}>
    <div className="tc">
      <img src={imgSrc} className="h4" alt={title}/>
    </div>
    </Animated>
    <div className="mt2 black-70 f5 b tc">{title}</div>
    <div className="mt3 black-50 f6">{body}</div>
  </div>);
};

export default Benefit;
