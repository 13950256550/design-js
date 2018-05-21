import React from 'react';
import { connect } from 'dva';
import { Row,Col,Divider,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';
import {copyGrid} from "../../../common/core/utils";

const columns = [
  [
    { key: 1, title: 'H2', width: '10%' },
    { key: 2, title: 'PIN', width: '10%' },
    { key: 3, title: 'TIN', width: '10%' },
    { key: 4, title: 'VUIN', width: '10%' },
    { key: 5, title: 'HFO', width: '10%' },
    { key: 6, title: 'SIGO', width: '10%' },
  ],
  [
    { key: 1, title: '第二站叶高',  width: '10%' },
    { key: 2, title: '进口总压kgf/(m*m)', width: '10%' },
    { key: 3, title: '进口总温k', width: '10%' },
    { key: 4, title: '进口周向速度m/s', width: '10%' },
    { key: 5, title: '第一排叶片进口叶高', width: '10%' },
    { key: 6, title: '进口总压恢复', width: '10%' },
  ],
];

@DesignPanel
class EnterConditionPanel extends React.PureComponent {
  handleTableChange = (value, row, col,id) =>{
    console.log(value, row, col,id)
    const grid = copyGrid(this.props.moduleData[id]);
    const moduleData = {}
    grid[row][col] = value;
    moduleData[id] = grid;
    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: moduleData,
    });
  }
  render() {
    const rows = [
      [{ key: '进口段总压恢复沿流向分布幂指数', type: 'typeLabel' }],
      [{ key: 'MUH根' },{ key: 'MUM中'},{ key: 'MUT尖'}],
    ];

    return (
      <div>
        <Row><Col offset={2}><Radio>内涵</Radio></Col></Row>
        <Divider />
        <Row>
          <Col offset={2} span={4}><Radio>数据</Radio></Col>
          <Col span={2}><Radio>图线 PIN</Radio></Col>
          <Col span={2}><Radio>TIN</Radio></Col>
          <Col span={2}><Radio>VUIN</Radio></Col>
          <Col span={2}><Radio>SIGO</Radio></Col>
        </Row>
        <Divider />
        {this.props.getRows(rows.slice(0, 2))}
        <Divider />
        <DoubleHeaderTable
          id="ControlVariable.grid1"
          columns={columns}
          dataSource={this.props.moduleData['ControlVariable.grid1']}
          onTableChange={this.handleTableChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    codelists: state.designS2.codelists,
    moduleData: state.designS2.moduleS2,
  };
}

export default connect(mapStateToProps)(EnterConditionPanel);
