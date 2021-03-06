import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'DT1', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: 'DH1', dataIndex: 'D1', width: '10%' },
    { key: 3, title: 'DH2', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: 'DH2', dataIndex: 'DTC', width: '10%' },
    { key: 5, title: 'HZ', dataIndex: 'DMC', width: '10%' },
    { key: 6, title: 'CMXR', dataIndex: 'DHC', width: '10%' },
    { key: 7, title: 'CMXS', dataIndex: 'DTK', width: '10%' },
    { key: 8, title: 'KGI', dataIndex: 'DFF', width: '10%' },
  ],
  [
    { key: 1, title: '转子进口外径', dataIndex: 'DT1', width: '10%' },
    { key: 2, title: '转子进口内径', dataIndex: 'D1', width: '10%' },
    { key: 3, title: '转子出口外径', dataIndex: 'DH1', width: '10%' },
    { key: 4, title: '转子出口内径', dataIndex: 'DTC', width: '10%' },
    { key: 5, title: '级加工因子', dataIndex: 'DMC', width: '10%' },
    { key: 6, title: '转子最大相对厚度', dataIndex: 'DHC', width: '10%' },
    { key: 7, title: '静子最大相对厚度', dataIndex: 'DTK', width: '10%' },
    { key: 8, title: '级流量储备系数', dataIndex: 'DFF', width: '10%' },
  ],
];

class CheckQuestion2Panel extends React.PureComponent {
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
      [{ key: '(K==1或K==3或K==4且K12==2)', type: 'typeLabel' }],
    ];
    return (
      <div>
        {this.getRows(rows)}
        <DoubleHeaderTable
          columns={columns}
          dataSource={this.props.module1D['CheckQuestion2Panel.grid1']}
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

export default connect(mapStateToProps)(CheckQuestion2Panel);
