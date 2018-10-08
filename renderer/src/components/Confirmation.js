import React from 'react';

import ProxyRow from 'components/ProxyRow';
import colors from 'utils/colors';

const Confirmation = ({title, content, cancelLabel, onCancel, confirmLabel, onConfirm}) => {
  return (<div className="" style={{}}>
    <div className="b black-60 tc pv2">
      {title}
    </div>
    <div className="tc mt3 black">
      {content}
    </div>
    <div className="cf mt1 w-60 center tc">
      <div className="fl w-30 pa2">
        <div
          className="black-50 dim pointer ba br2 b--black-20 b pa1"
          onClick={onCancel}
        >
          {cancelLabel}
        </div>
      </div>
      <div className="fl w-70 pa2">
        <div
          className="ba bw1 br2 pa1 pointer dim black-80" style={{borderColor: colors.yellow}}
          onClick={onConfirm}
        >
          {confirmLabel}
        </div>
      </div>
    </div>
  </div>);
};

Confirmation.defaultProps = {
  cancelLabel: 'Cancel'
};

export default Confirmation;
