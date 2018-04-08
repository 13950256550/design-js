import React from 'react';
import { Input } from 'antd';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export class NumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    let reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (this.props.reg) {
      reg = this.props.reg;
    }
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }
  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value) {
      try {
        if (value.charAt(value.length - 1) === '.' || value === '-') {
          onChange({ value: value.slice(0, -1) });
        }
        if (onBlur) {
          onBlur();
        }
      } catch (err) {
        console.log('NumericInput onBlur error');
      }
    }
  }
  render() {
    return (
      <Input
        {...this.props}
        onChange={this.onChange}
        onBlur={this.onBlur}
        maxLength="25"
      />
    );
  }
}

