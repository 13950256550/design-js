import React from 'react';
import { connect } from 'dva';
import { Row,Col,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import CustomTable from '../../../common/core/components/table/CustomTable';
import SimpleLineChart2 from '../../../common/core/components/D3Chart/SimpleLineChart2';

const columns = [
  { key: 1, title: 'LINE', width: '1%' },
  { key: 2, title: 'GP', width: '5%' },
];

@DesignPanel
class FlowRatioPanel extends React.PureComponent {
  render() {
    return (
      <div>
        <Row>
          <Col span={4} offset={2}><Radio>内涵</Radio></Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={4} >
            <CustomTable
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
