import React from 'react';
import { connect } from 'dva';
import { Row,Col,Divider,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import CustomSelectionTable from '../../../common/core/components/table/CustomSelectionTable';
import {copyGrid} from '../../../common/core/utils';


const Options = [
  {key:'0',value:'入口站'},
  {key:'1',value:'出口站'},
];
const columns = [
    { key: 1, title: '进出口站',option:Options,  width: '8%' },
    { key: 2, title: 'RHUB', width: '10%' },
    { key: 3, title: 'ZHUB', width: '10%' },
    { key: 4, title: 'RTIP', width: '10%' },
    { key: 5, title: 'ZTIP', width: '10%' },
    { key: 6, title: 'KBK', width: '10%' },
];

@DesignPanel
class FlowPathAndBoundaryLayerPanel extends React.PureComponent {
  handleTableChange = (value, row, col,id) =>{
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
      [{ key: 'LPB计算站形状' },{ key: 'KPV根部流路' },{ key: 'KPP尖部流路' }],
    ];

    return (
      <div>
        <Row><Col offset={2}><Radio>内涵</Radio></Col></Row>
        <Divider />
        <Row>
          <Col offset={2} span={4}><Radio>流路数据</Radio></Col>
          <Col span={2}><Radio>图线 根锥角</Radio></Col>
          <Col span={2}><Radio>尖锥角</Radio></Col>
          <Col span={2}><Radio>根曲率</Radio></Col>
          <Col span={2}><Radio>尖曲率</Radio></Col>
          <Col span={2}><Radio>面积</Radio></Col>
          <Col span={2}><Radio>跗面层堵塞系数</Radio></Col>
        </Row>
        <Divider />
        {this.props.getRows(rows.slice(0, 1))}
        <Divider />
        <CustomSelectionTable
          id="ControlVariable.grid2"
          columns={columns}
          dataSource={this.props.moduleData['ControlVariable.grid2']}
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

export default connect(mapStateToProps)(FlowPathAndBoundaryLayerPanel);
