import React from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import CustomTable from '../../../common/core/components/table/CustomTable';
import { getCodeList } from '../../../common/core/CodeList';

const columns = [
  [
    { key: 1, title: 'DT1', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: 'D1', dataIndex: 'D1', width: '10%' },
    { key: 3, title: 'DH1', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: 'DTC', dataIndex: 'DTC', width: '10%' },
    { key: 5, title: 'DMC', dataIndex: 'DMC', width: '10%' },
    { key: 6, title: 'DHC', dataIndex: 'DHC', width: '10%' },
    { key: 7, title: 'DTK', dataIndex: 'DTK', width: '10%' },
    { key: 8, title: 'DFF', dataIndex: 'DFF', width: '10%' },
    { key: 9, title: 'DHK', dataIndex: 'DHK', width: '10%' },
  ],
  [
    { key: 1, title: '', dataIndex: '0', width: '10%' },
    { key: 2, title: '1', dataIndex: '1', width: '10%' },
    { key: 3, title: '2', dataIndex: '2', width: '10%' },
    { key: 4, title: '3', dataIndex: '3', width: '10%' },
    { key: 5, title: '4', dataIndex: '4', width: '10%' },
    { key: 6, title: '5', dataIndex: '5', width: '10%' },
    { key: 7, title: '6', dataIndex: '6', width: '10%' },
    { key: 8, title: '7', dataIndex: '7', width: '10%' },
  ],
];

const dataSource = [
  ['', '', '', '', '', '', '', '', ''],
];

class DesignProblemPanel extends React.PureComponent {
  state = {
    columnsIndex: 0,
  }

  componentWillMount() {
    if (this.props.module1D && !this.props.module1D.DesignProblemGrid1) {
      this.props.dispatch({
        type: 'design/save1d',
        payload: { DesignProblemGrid1: dataSource },
      });
    }
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

  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;

    this.props.dispatch({
      type: 'design/save1d',
      payload: obj,
    });

    if (key === 'KPATH流路输入标识') {

    }
  }

  handleTableChange = (value, row, col) => {
    const grid = this.props.module1D.DesignProblemGrid1;
    grid[row][col] = value;

    this.props.dispatch({
      type: 'design/save1d',
      payload: { DesignProblemGrid1: grid },
    });
  };

  render() {
    const rows = [
      [{ key: 'RPM转速度或第一级转子叶尖切线速度', span: 2, type: 'longLabel' }, { key: 'PO进口总压' }, { key: 'TO进口总温' }],
      [{ key: 'PR总压比' }, { key: 'G流量' }, { key: 'EFF绝热效率' }, { key: 'ISTAGE级数' }],
      [{ key: 'KH设计压比提高量' }, { key: 'KF叶型标识' }],
      [{ key: 'KC压气机类型' }, { key: 'SIGO进口段总压恢复' }, { key: 'SIGV进口导叶总压恢复' }],
      [{ key: 'KPATH流路输入标识', span: 2 }],
      [{ key: 'PRO本压气机前已有压比' }, { key: 'KG流量缩放系数' }],
      [{ key: 'VA1一级进轴速度' }, { key: 'VAM中段轴速度' }, { key: 'VAC出口轴速' }],
      [{ key: 'ALF1一转进气流角' }, { key: 'OMGN第中级反力度' }, { key: 'DOMG第中级后反力度增量' }, { key: 'ALFK最后静子出口气流角' }],
      [{ key: 'HZ1第一级' }, { key: 'HZM平均级' }, { key: 'HZK最后级' }],
      [{ key: 'KH1第一级' }, { key: 'DKH逐级递减值' }, { key: 'KHMIN最小值' }],
      [{ key: 'ASP1一转展弦比' }, { key: 'BTH1一转尖根弦长比' }, { key: 'ASPK末转展弦比' }],
      [{ key: 'ABV进口导叶' }, { key: 'ABR转子叶片' }, { key: 'ABS静子叶片' }],
      [{ key: 'BTHV尖根弦长比' }, { key: 'ASPV展弦比' }, { key: 'BTV稠度' }, { key: 'CMV进口导叶最大相对厚度' }],
      [{ key: 'DHO出口内直径' }, { key: 'DTO出口外直径' }, { key: 'BTV稠度' }, { key: 'HORDA最小弦长' }],
      [{ key: 'DENR转件' }, { key: 'DENS静件' }],
      [{ key: 'DENB叶片' }, { key: 'DRES转子根许用应力' }],
    ];

    return (
      <div>
        {this.getRows(rows.slice(0, 4))}
        <Divider orientation="left">KPATH关联变量</Divider>
        {this.getRows(rows.slice(4, 5))}
        <Divider orientation="left">请选择流路的11种形式,在表中**处写具体数值</Divider>
        <CustomTable
          columns={columns[this.state.columnsIndex]}
          dataSource={this.props.module1D.DesignProblemGrid1}
          onTableChange={this.handleTableChange}
        />
        <Divider />
        {this.getRows(rows.slice(5, 14))}
        <Divider orientation="left">材料密度</Divider>
        {this.getRows(rows.slice(14, 16))}
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

export default connect(mapStateToProps)(DesignProblemPanel);
