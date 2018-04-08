import React from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';

class ControlVariablePanel extends React.PureComponent {
  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;

    this.props.dispatch({
      type: 'design/save1d',
      payload: obj,
    });
  }

  getComponent = (params) => {
    const { key, callback, span, type } = { ...params };
    let data = this.props.module1D[key];
    if (!data) {
      data = { key, label: key };
    }
    const codelist = getCodeList(this.props.codelists, key);
    const width = 6;
    return (
      <Col span={width * (span || 1)}>
        <CustomInput
          data={data}
          codelist={codelist}
          span={span || 1}
          type={type}
          onChange={callback || this.handleChange}
        />
      </Col>
    );
  }

  getRow = (list) => {
    const cols = list.map((data => this.getComponent(data)));
    return (
      <Row>
        {cols}
      </Row>
    );
  }

  getRows = (list) => {
    return list.map((data => this.getRow(data)));
  }

  render() {
    const rows = [
      [{ key: '作业题目_TITLT', callback: this.handleChange, span: 4 }],
      [{ key: '气压机个数_IRE', span: 2 }, { key: '机组个数_NV' }, { key: '解题类型_K' }],
      [{ key: '检查或设计_K12' }, { key: '损失修正符_IZI' }, { key: '不输K12_IZI', type: 'typeLabel' }],
      [{ key: '损失校正系数ALN' }, { key: 'ALW' }, { key: 'PKN' }, { key: 'PKW' }],
      [{ key: '静叶可调_IREG' }, { key: '两特性同图IHAR' }, { key: '不输IREG_IHAR' }],
      [{ key: '流路转换_IZX' }, { key: '叶排轴向长度缩放_IDX' }, { key: '性能参数分布_IPE' }],
      [{ key: '叶型参数分布_IFH' }, { key: '叶排内设站_INZ' }],
    ];
    return (
      <div>
        {this.getRows(rows.slice(0, 5))}
        <Divider orientation="left">以下5个参数为向二维设计文件提供输入的控制符</Divider>
        {this.getRows(rows.slice(5))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    codelists: state.design.codelists,
    module1D: state.design.module1D,
  };
}

export default connect(mapStateToProps)(ControlVariablePanel);
