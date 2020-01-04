import React from 'react';

import Underlined from 'components/Underlined';

const About = () => {
  return (<div>
    <Underlined heading={"About"} />
    <div className="w-90 w-40-ns center">
      <p>
        I recently came across a usecase that needed a local https server.   
        Being the lazy programmer I am, I searched the depths of Google to find a tool that will do this for me. 
        I found hotel & devcert to be the least painful solutions. Both of them partially solved the problem.
      </p>
      <p>
        I wanted a simple GUI where you add the local site name, add a proxy address and click save. 
        That's what I built.
      </p>
      <p>
        Find me on twitter and medium. Support queries are best handled using live chat.
      </p>
    </div>
  </div>)
};

export default About;