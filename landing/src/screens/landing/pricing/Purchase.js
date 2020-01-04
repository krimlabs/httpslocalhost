import React from 'react';

import Row from 'screens/landing/pricing/purchase/Row';

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numLicenses: 5
    };

    this.onNumLicenseChange = this.onNumLicenseChange.bind(this);
    this.onNumLicenseChange = this.onNumLicenseChange.bind(this);
  }

  onNumLicenseChange(e) {
    this.setState({numLicenses: e.target.value})
  }

  calculateDiscount(numLicenses) {
    return numLicenses > 0 && numLicenses <= 5 ? 0 :
      numLicenses > 5 && numLicenses <= 20 ? 10 :
      numLicenses > 20 && numLicenses <=50 ? 20 :
      numLicenses ? 30 : 0
    ;
  }

  render() {
    const {numLicenses} = this.state;
    const totalPrice = numLicenses*12;
    const discount = this.calculateDiscount(numLicenses);
    const discountedPrice = totalPrice - (totalPrice*discount)/100;

    return (<div className="mt3">
      <Row
        left={"Number of licences to purchase:"}
        right={<input className="w-80 fr nt1" type="number" onChange={this.onNumLicenseChange} value={numLicenses}/>}
      />

      <Row 
        left={"Cost per license for lifetime:"}
        right={<div className="tr">$ 12</div>}
      />

      <Row 
        left={"Bulk purchase discount:"}
        right={<div className="tr">{discount} %</div>}
      />      

      <Row 
        left={"Total:"}
        right={<div className="tr">$ {discountedPrice}</div>}
      />
    </div>)
  }
}

export default Purchase;