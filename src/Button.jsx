import React from 'react';

class Button extends React.Component {
  render() {
    const { onClick, text } = this.props;
    return (
      <button onClick={onClick} style={{backgroundColor : "orange"}}>{text}</button>
    );
  }
}

export default Button;
