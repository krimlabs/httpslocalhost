import React from 'react'

// import vivekImage from 'assets/images/vivek.jpg'
// import anandImage from 'assets/images/anand.jpeg'
// import TarekImage from 'assets/images/tarek.png'
import logo from 'assets/img/logo.svg';
import Testimony from 'screens/landing/testimonies/Testimony';
import Underlined from 'components/Underlined';

const testimonies = [
  {
    body: `A major part of my job is to reach out and sell on email and I've used everything I can get my hands on. <br/><br/> I liked the authenticity of their message. It's true that most customers hate outreach emails. This app helps me reach out only to those who intend to buy.`,
    avatar: logo,
    name: 'Anand Chowdhary',
    designation: 'CEO, Oswald Labs',
    marginTop: -20,
  },
  {
    body:
      'Their analytics helped us find leads we should focus on. They were strinkingly, on point with that.',
    avatar: logo,
    name: 'Vivek Goel',
    designation: 'CEO, Emanant Technologies',
    marginTop: 0,
  },
  {
    body:
      'Running a campaign was very easy and automation around intent helped us generate quality leads.<br/> <br/>We do not spend much time on follow ups now, they (Speer) do it for us.',
    avatar: logo,
    name: 'Tarek Gethe',
    designation: 'Head of Sales, Germany, A11Y.co',
    marginTop: -20,
  },
];

const Testimonies = () => {
  return (<div className="mt4 mt0-ns w-100 w-70-ns center">
    <Underlined heading={"Testimonies"} />
    <div className="cf pv4">
      {testimonies.map((t, i) => (
        <Testimony key={i} {...t} />
      ))}
    </div>
  </div>);
};

export default Testimonies;
