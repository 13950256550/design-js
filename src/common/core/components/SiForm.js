
import React from 'react';
import moment from 'moment';
import { Form, Col, Input, Select, DatePicker } from 'antd';
import { NumericInput } from './NumericInput';
import { getSelectOptions } from '../../../utils/codeList';

const FormItem = Form.Item;

const defaultColSpan = 6;
const formItemLayoutSpan1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayoutSpan2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutSpan3 = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayoutSpan4 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

@Form.create()
export class SiForm extends React.Component {
  getFieldsValue = (params) => {
    const values = this.props.form.getFieldsValue(params);
    const unWrapperValue = { ...values };

    Object.keys(values).forEach((key) => {
      const aField = this.props.fields.find(field => field.fieldId === key);
      if (aField.dateFormat) {
        if (unWrapperValue[key]) {
          unWrapperValue[key] = unWrapperValue[key].format(aField.dateFormat);
        }
      }
    });
    return unWrapperValue;
  }

  setFieldsValue = (values) => {
    const wrapperValue = { ...values };
    Object.keys(values).forEach((key) => {
      const aField = this.props.fields.find(field => field.fieldId === key);
      if (aField.dateFormat) {
        wrapperValue[key] = moment(wrapperValue[key], aField.dateFormat);
      }
    });
    this.props.form.setFieldsValue(wrapperValue);
  }

  clear = () => {
    this.props.form.resetFields();
  }

  validateFields = () => {
    let result = true;
    this.props.form.validateFields((err) => {
      if (err) {
        result = false;
      }
    });
    return result;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { fields } = this.props;
    const children = [];

    let colSpan = this.props.col;
    if (this.props.col === null || this.props.col === undefined) {
      colSpan = defaultColSpan;
    }

    for (let i = 0; i < fields.length; i += 1) {
      if (fields[i].span === null || fields[i].span === undefined) {
        fields[i].span = 1;
      }
      if (fields[i].formItemLayout === null || fields[i].formItemLayout === undefined) {
        if (fields[i].span === 2) {
          fields[i].formItemLayout = formItemLayoutSpan2;
        } else if (fields[i].span === 3) {
          fields[i].formItemLayout = formItemLayoutSpan3;
        } else if (fields[i].span === 4) {
          fields[i].formItemLayout = formItemLayoutSpan4;
        } else {
          fields[i].formItemLayout = formItemLayoutSpan1;
        }
      }

      let input;
      if (fields[i].code !== null && fields[i].code !== undefined) {
        const options = getSelectOptions(fields[i].code);
        input = (
          <Select allowClear style={{ width: 180 }}>
            {options}
          </Select>
        );
      } else if (fields[i].dateFormat !== null && fields[i].dateFormat !== undefined) {
        input = <DatePicker format={fields[i].dateFormat} />;
      } else if (fields[i].number) {
        input = <NumericInput {...fields[i]} />;
      } else {
        input = <Input placeholder={fields[i].placeholder || ''} {...fields[i]} />;
      }
      /*
      const item = getFieldDecorator(`${fields[i].fieldId}`, { rules: fields[i].rules })(input);
      // const item = getFieldDecorator(fields[i].fieldId, { rules: fields[i].rules })(input);
      let value = data[fields[i].fieldId];
      if (fields[i].dateFormat !== null && fields[i].dateFormat !== undefined) {
        value = moment(value, fields[i].dateFormat);
      } */

      const rules = {
        rules: [
          { required: fields[i].required || false, message: ' ' },
        ],
      };
      children.push(
        <Col span={colSpan} key={i}>
          <FormItem {...fields[i].formItemLayout} label={fields[i].label}>
            {getFieldDecorator(`${fields[i].fieldId}`, rules)(input)}
          </FormItem>
        </Col>,
      );
    }

    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} >
        {children}
      </Form>
    );
  }
}
