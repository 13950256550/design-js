import React from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import CustomTable from '../../../common/core/components/table/CustomTable';
import { getCodeList } from '../../../common/core/CodeList';
import {getColumns, getMatrix} from "../../../utils/utils";

const columns1 = [
  { key: 1, title: 'A', dataIndex: 'A', width: '10%' },
  { key: 2, title: 'B', dataIndex: 'B', width: '10%' },
  { key: 3, title: 'C', dataIndex: 'C', width: '10%' },
  { key: 4, title: 'D', dataIndex: 'D', width: '10%' },
  { key: 5, title: 'E', dataIndex: 'E', width: '10%' },
  { key: 6, title: 'F', dataIndex: 'F', width: '10%' },
  { key: 7, title: 'G', dataIndex: 'G', width: '10%' },
  { key: 8, title: 'H', dataIndex: 'H', width: '10%' },
  { key: 7, title: 'I', dataIndex: 'I', width: '10%' },
  { key: 8, title: 'J', dataIndex: 'J', width: '10%' },
];

const columns2 = [
  { key: 1, title: 'A', dataIndex: 'A', width: '10%' },
  { key: 2, title: 'B', dataIndex: 'B', width: '10%' },
  { key: 3, title: 'C', dataIndex: 'C', width: '10%' },
  { key: 4, title: 'D', dataIndex: 'D', width: '10%' },
  { key: 5, title: 'E', dataIndex: 'E', width: '10%' },
  { key: 6, title: 'F', dataIndex: 'F', width: '10%' },
  { key: 7, title: 'G', dataIndex: 'G', width: '10%' },
];

const rowHeader = ['NR','QL']

class FeaturesCalculate1Panel extends React.PureComponent {
  getComponent = (params,i) => {
    const { key, callback, span, type } = { ...params };
    let data = this.props.module1D[key];
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
          onChange={callback || this.handleChange}
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

  handleChange = (key, data) => {
    const module1D = {};
    module1D[key] = data;

    if(key==='等转速条线数N'){
      module1D['FeaturesCalculate1Panel.grid1']=getMatrix(2,data.value,'0',this.props.module1D['FeaturesCalculate1Panel.grid1'])
    }

    if(key==='共同工作线给定LSR'){
      module1D['FeaturesCalculate1Panel.grid2']=getMatrix(2,data.value,'0',this.props.module1D['FeaturesCalculate1Panel.grid2'])
    }

    this.props.dispatch({
      type: 'design/save1d',
      payload: module1D,
    });
  }

  render() {
    const rows = [
      [{ key: '等转速条线数N' }, { key: '气体常数R' }, { key: '绝热指数K' }],
      [{ key: '状态点间隔DQ' }, { key: '垂直段误差精度Q值EQ' }, { key: '总压系数ESIG' }],
      [{ key: '控制参数KGKA' }, { key: '控制参数IGKA' }, { key: '转速和状态点控制IVAR1' }],
      [{ key: '状态点计算控制IQP' }, { key: '搜索共同工作点IZAP' }, { key: '共同工作线给定LSR' }],
      [{ key: '堵点失速点输出KPATH1' }, { key: '计算结果输出KPATH2' }, { key: '压比收敛精度EPR' }],
      [{ key: '流量储备系数KG' }, { key: '总压恢复步长DSIG' }, { key: '喘振裕度SM' }],
      [{ key: '垂直段单点压比PR2' }, { key: '(IQR=2)', type: 'typeLabel' }, { key: '上起点压比与最小压比之比PRB' }],
      [{ key: '转速线起始NNS' }, { key: '终止NNF' }],
      [{ key: '计算级起始IIS' }, { key: '终止IIF' }],
      [{ key: 'Qλ限制最小值QQS' }, { key: '最大值QQF' }],
      [{ key: 'ASP1一转展弦比' }, { key: 'BTH1一转尖根弦长比' }, { key: 'ASPK末转展弦比' }],
      [{ key: 'ABV进口导叶' }, { key: 'ABR转子叶片' }, { key: 'ABS静子叶片' }],
      [{ key: 'BTHV尖根弦长比' }, { key: 'ASPV展弦比' }, { key: 'BTV稠度' }, { key: 'CMV进口导叶最大相对厚度' }],
      [{ key: 'DHO出口内直径' }, { key: 'DTO出口外直径' }, { key: 'BTV稠度' }, { key: 'HORDA最小弦长' }],
      [{ key: 'DENR转件' }, { key: 'DENS静件' }],
      [{ key: 'DENB叶片' }, { key: 'DRES转子根许用应力' }],
    ];
    const column = getColumns(this.props.module1D['等转速条线数N'].value);
    return (
      <div>
        {this.getRows(rows.slice(0, 3))}
        <Divider orientation="left">NR QL</Divider>
        <CustomTable
          columns={column}
          dataSource={this.props.module1D['FeaturesCalculate1Panel.grid1']}
          onTableChange={this.handleTableChange}
          rowHeader={rowHeader}
        />
        <Divider />
        {this.getRows(rows.slice(3, 10))}
        <Divider orientation="left">共同工作线(LSR ≠ 0 输) 由低向高顺序 2≤L≤10 点)</Divider>
        <CustomTable
          columns={columns2}
          dataSource={this.props.module1D['FeaturesCalculate1Panel.grid2']}
          onTableChange={this.handleTableChange}
        />
        <Divider />
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

export default connect(mapStateToProps)(FeaturesCalculate1Panel);
