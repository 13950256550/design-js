import React from 'react';
import { connect } from 'dva';
import { Row,Col,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import CustomTable from '../../../common/core/components/table/CustomTable';
import SimpleLineChart2 from '../../../common/core/components/D3Chart/SimpleLineChart2';
import {copyGrid} from "../../../common/core/utils";

const columns = [
  { key: 1, title: 'LINE', width: '1%' },
  { key: 2, title: 'GP', width: '5%' },
];

@DesignPanel
class FlowRatioPanel extends React.PureComponent {
  handleTableChange = (value, row, col,id) =>{
    const grid = copyGrid(this.props.moduleData[id]);
    const moduleData = {}
    grid[row][col] = value;
    moduleData[id] = grid;
    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: moduleData,
    });

    this.chart.redraw([grid]);
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={4} offset={2}><Radio>内涵</Radio></Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={4} >
            <CustomTable
              id="ControlVariable.grid4"
              columns={columns}
              dataSource={this.props.moduleData['ControlVariable.grid4']}
              onTableChange={this.handleTableChange}
            />
          </Col>
          <Col span={12} >
            <SimpleLineChart2
              yTitle="STREAMLINE"
              xTitle="GP"
              width={700}
              height={500}
              data={[this.props.moduleData['ControlVariable.grid4']]}
              ref={(c) => { this.chart = c; }}
            />
          </Col>
        </Row>
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

export default connect(mapStateToProps)(FlowRatioPanel);
