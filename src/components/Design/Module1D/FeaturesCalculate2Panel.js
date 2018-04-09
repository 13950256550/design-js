import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'DIR', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: 'KPR', dataIndex: 'D1', width: '10%' },
    { key: 3, title: 'FAIR', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: 'DIS', dataIndex: 'DTC', width: '10%' },
    { key: 5, title: 'AGR', dataIndex: 'DMC', width: '10%' },
    { key: 6, title: 'AGS', dataIndex: 'DHC', width: '10%' },
  ],
  [
    { key: 1, title: '转子攻角修正', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: '转速线斜率', dataIndex: 'D1', width: '10%' },
    { key: 3, title: '转子失速负荷', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: '静子攻角修正', dataIndex: 'DTC', width: '10%' },
    { key: 5, title: '转子A/A*', dataIndex: 'DMC', width: '10%' },
    { key: 6, title: '静子A/A*', dataIndex: 'DHC', width: '10%' },
  ],
];

class FeaturesCalculate2Panel extends React.PureComponent {
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
      [{ key: 'KGKA==1 输入', type: 'typeLabel' }],
    ];
    return (
      <div>
        {this.getRows(rows)}
        <DoubleHeaderTable
          columns={columns}
          dataSource={this.props.module1D['FeaturesCalculate2Panel.grid1']}
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

export default connect(mapStateToProps)(FeaturesCalculate2Panel);
