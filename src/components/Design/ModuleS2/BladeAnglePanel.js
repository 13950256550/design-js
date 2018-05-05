import React from 'react';
import { connect } from 'dva';
import { Row,Col,Divider,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'RR1', width: '10%' },
    { key: 2, title: 'BET1', width: '10%' },
    { key: 3, title: 'RR2', width: '10%' },
    { key: 4, title: 'BET2', width: '10%' },
  ],
  [
    { key: 1, title: '叶排进口半径',  width: '10%' },
    { key: 2, title: '叶排进口叶型角', width: '10%' },
    { key: 3, title: '叶排出口半径', width: '10%' },
    { key: 4, title: '叶排出口叶型角', width: '10%' },
  ],
];

@DesignPanel
class BladeAnglePanel extends React.PureComponent {

  render() {
    const rows = [
      [{ key: 'NSI点数' },{ key: 'NROW序号'}],
    ];

    return (
      <div>
        <Divider orientation="left">当IDEV=1 且 NROW>0 时输出叶排叶型角</Divider>
        {this.props.getRows(rows.slice(0, 1))}
        <Row>
          <Col offset={2} span={4}><Radio>内涵</Radio></Col>
          <Col span={2}><Radio>BET1</Radio></Col>
          <Col span={2}><Radio>BET2</Radio></Col>
        </Row>
        <DoubleHeaderTable
          columns={columns}
          dataSource={[]}
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

export default connect(mapStateToProps)(BladeAnglePanel);
