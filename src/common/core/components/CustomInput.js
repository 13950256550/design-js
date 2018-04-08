import React from 'react';
import { connect } from 'dva';
import { Input, Select } from 'antd';
import styles from './CustomInput.less';
import { getSelectOptions } from '../CodeList';

const sylesNames = {
  1: {
    div: styles.customdiv,
    input: styles.custominput,
  },
  2: {
    div: styles.customdiv_2,
    input: styles.custominput_2,
  },
  3: {
    div: styles.customdiv_3,
    input: styles.custominput_3,
  },
  4: {
    div: styles.customdiv_4,
    input: styles.custominput_4,
  },
};

class CustomInput extends React.PureComponent {
  getInputComponent = (value, span) => {
    return (
      <Input
        value={value}
        className={sylesNames[span].input}
        onChange={this.handleInputChange}
      />
    );
  }

  getSelectComponent = (codelist, value, span) => {
    return (
      <Select
        className={sylesNames[span].input}
        value={value}
        onChange={this.handleSelectChange}
        size="small"
      >
        {getSelectOptions(codelist)}
      </Select>
    );
  }

  getComponent = (params) => {
    const { data, codelist, span, type } = { ...params };
    let Component;
    let input;
    const label = <span className={styles.customspan}>{data.label}</span>;

    if (type) {
      switch (type) {
        case 'typeLabel':
          Component = (
            <div className={sylesNames[span].div}>
              <span className={styles.customspan_21}>{data.key}</span>
            </div>
          );
          break;
        case 'typeLabel2':
          Component = (
            <div className={sylesNames[span].div}>
              <span className={styles.customspan_21}>{data.key}</span>
            </div>
          );
          break;
        case 'longLabel':
          if (codelist && codelist.length > 0) {
            input = this.getSelectComponent(codelist, data.value, 1);
          } else {
            input = this.getInputComponent(data.value, 1);
          }
          Component = (
            <div className={sylesNames[span].div}>
              <span className={styles.customspan_2}>{data.label}</span>
              {input}
            </div>
          );
          break;
        default:
      }
    } else if (data) {
      if (codelist && codelist.length > 0) {
        input = this.getSelectComponent(codelist, data.value, span);
      } else {
        input = this.getInputComponent(data.value, span);
      }

      Component = (
        <div className={sylesNames[span].div}>
          {label}
          {input}
        </div>
      );
    } else {
      Component = (
        <div />
      );
    }


    return Component;
  }

  handleInputChange = (e) => {
    e.preventDefault();
    if (this.props.onChange) {
      const obj = { ...this.props.data };
      obj.value = e.target.value;
      this.props.onChange(this.props.data.id, obj);
    }
  };

  handleSelectChange = (value) => {
    if (this.props.onChange) {
      const obj = { ...this.props.data };
      obj.value = value;
      this.props.onChange(this.props.data.id, obj);
    }
  };

  render() {
    return this.getComponent(this.props);
  }
}

export default connect()(CustomInput);
