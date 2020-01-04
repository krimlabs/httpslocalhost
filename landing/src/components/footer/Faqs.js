import React from 'react';

const faqs = [{
  question: 'Do I need to enter my credit card to download ?',
  answer: 'Not at all. HTTPSLocalhost is free to evaluate for 14 days. You can then purchase a lifetime license (if you want), or delete the app.'
}, {
  question: 'Do you offer discounts on purchase of more than one license ?',
  answer: 'Yes. All purchases of more than one licenses are discounted.'
}, {
  question: 'Why should I pay you, I can simply run the scripts myself ?',
  answer: `You don't need to pay us anything to use the app. Only if you want to support us, you can buy a paid version.`
}, {
  question: 'Is there a Windows or Linux version ?',
  answer: 'Linux is on its way (register here if you want to get notified when we release). We don’t plan to support Windows.'
}, {
  question: 'Who are you, why did you built this ?',
  answer: 'We are Krim Labs, a New Delhi based development studio. We built HTTPSLocalhost when we wanted https locally for a particular use case and found out that there is no fast way to do it across the team. We were surprised that nobody had built this yet. Hence we took the opportunity.'
}, {
  question: 'Is there a difference between the paid version and the free version ?',
  answer: 'No. Both versions are identical. The only difference is that the free version pokes you to buy the paid version every 14 days. You can simply click Cancel.'
}, {
  question: 'I use ngrok for local https, how is this better ?',
  answer: 'Ngrok is a tunneling system. HTTPSLocalhost is a local proxy. You can use both to get local https, but HTTPSLocalhost works without the internet and also allows you to have custom local domains. '
}];

const Faqs = () => {
  return (<React.Fragment>
    <div className="f4 b mb3 black-80">Frequently asked questions</div>
    <div>
      {faqs.map((f, i) => (<div className="mt4" key={i}>
        <div className="b mb1 black-40">{f.question}</div>
        <div className="black-60">{f.answer}</div>
      </div>))}
    </div>
  </React.Fragment>);
};

export default Faqs;
