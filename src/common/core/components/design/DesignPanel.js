import React from 'react';
import { Row, Col } from 'antd';

import {getCodeList} from "../../CodeList";
import CustomInput from '../../components/CustomInput';


const DesignPanel = WrappedComponent => class extends React.PureComponent {
  getComponentValue = (key) =>{
    let result = this.props.moduleData
    const arr = key.split('.')
    arr.forEach((e)=>{
      result = result[e];
    })
    return result
  }
  getCodelistKey =(key)=>{
    const arr = key.split('.')
    return arr[arr.length-1]
  }
  getComponent = (params,i) => {
    const { key, callback, span, type } = { ...params };
    let data = this.props.moduleData[key];
    if (!data) {
      data = { key, label: key };
    }
    const codelist = getCodeList(this.props.codelists, key);
    const width = 6;

    return (
      <Col span={width * (span || 1)} key={i}>
        <CustomInput
          data={data}
          codelist={codelist}
          span={span || 1}
          type={type}
          onChange={callback||this.props.handleChange}
        />
      </Col>
    );
  }

  getRow = (list,i) => {
    const cols = list.map(((data,id) => this.getComponent(data,id)));
    return (
      <Row key={i}>
        {cols}
      </Row>
    );
  }

  getRows = (list) => {
    return list.map(((data,i) => this.getRow(data,i)));
  }

  render() {
    const props = {
      ...this.props,
      getRows:this.getRows,
      getComponent:this.getComponent,
    }
    return (
      <WrappedComponent
        {...props}
      />
);
  }
}

export default DesignPanel;
