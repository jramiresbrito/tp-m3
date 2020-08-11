import React, { Component } from 'react';

export default class Input extends Component {
  handleInputChange = (event) => {
    this.props.onChangeValue(event.target.value);
  };

  render() {
    const { type, min, readonly, value } = this.props;
    return (
      <input
        type={type}
        name="fullSalary"
        min={min}
        readOnly={readonly}
        onChange={this.handleInputChange}
        value={value}
      />
    );
  }
}
