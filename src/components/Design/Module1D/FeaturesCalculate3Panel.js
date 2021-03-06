import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'KD', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: 'KGB', dataIndex: 'D1', width: '10%' },
    { key: 3, title: 'KHS', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: 'KEF', dataIndex: 'DTC', width: '10%' },
  ],
  [
    { key: 1, title: '落后角补偿', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: '流量堵塞系数', dataIndex: 'D1', width: '10%' },
    { key: 3, title: '功储备系数', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: '功率衰减系数', dataIndex: 'DTC', width: '10%' },
  ],
];

class FeaturesCalculate3Panel extends React.PureComponent {
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
  render() {
    const rows = [
      [{ key: 'IGKA==1 输入', type: 'typeLabel' }],
    ];
    return (
      <div>
        {this.getRows(rows)}
        <DoubleHeaderTable
          columns={columns}
          dataSource={this.props.module1D['FeaturesCalculate3Panel.grid1']}
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

export default connect(mapStateToProps)(FeaturesCalculate3Panel);
