import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import CustomTable from '../../../common/core/components/table/CustomTable';

const columns = [
  { key: 1, title: 'BTR', dataIndex: 'DT1', width: '10%' },
  { key: 2, title: 'BTS', dataIndex: 'D1', width: '10%' },
  { key: 3, title: 'ALF', dataIndex: 'DH1', width: '10%' },
  { key: 4, title: 'IZR/ASPR', dataIndex: 'DTC', width: '10%' },
  { key: 5, title: 'IZS/ASPS', dataIndex: 'DMC', width: '10%' },
  { key: 6, title: 'ABR', dataIndex: 'DHC', width: '10%' },
  { key: 7, title: 'ABS', dataIndex: 'DTK', width: '10%' },
  { key: 8, title: 'KHI', dataIndex: 'DFF', width: '10%' },
];

class CheckQuestion3Panel extends React.PureComponent {
  getComponent = (params) => {
    const { key, callback, span, type } = { ...params };
    let data = this.props.module1D[key];
    if (!data) {
      data = { key, label: key };
    }
    const width = 6;
    return (
      <Col span={width * (span || 1)}>
        <CustomInput
          data={data}
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
      [{ key: '(K==1或K==3或K==4且K12==2)', type: 'typeLabel' }],
    ];
    return (
      <div>
        {this.getRows(rows)}
        <CustomTable
          columns={columns}
          dataSource={this.props.module1D['CheckQuestion3Panel.grid1']}
          onTableChange={this.handleTableChange}
        />
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

export default connect(mapStateToProps)(CheckQuestion3Panel);
