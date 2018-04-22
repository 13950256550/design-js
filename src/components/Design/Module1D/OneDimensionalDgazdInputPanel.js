import React from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'DZR', width: '10%' },
    { key: 2, title: 'DZS', width: '10%' },
    { key: 3, title: 'DXR', width: '10%' },
    { key: 4, title: 'DXS', width: '10%' },
    { key: 5, title: 'NZR', width: '10%' },
    { key: 6, title: 'NZS', width: '10%' },
  ],
  [
    { key: 1, title: '转子叶排尖根轴向长度比', width: '10%' },
    { key: 2, title: '静子叶排尖根轴向长度比', width: '10%' },
    { key: 3, title: '转子叶排轴向长度缩放系数', width: '10%' },
    { key: 4, title: '静子叶排轴向长度缩放系数', width: '10%' },
    { key: 5, title: '转子叶排内加设的计算站数', width: '10%' },
    { key: 6, title: '静子叶排内加设的计算站数', width: '10%' },
  ],
];

class OneDimensionalDgazdInputPanel extends React.PureComponent {
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
      [{ key: 'DZV进口导叶尖根轴向长度比' },{ key: 'DXV轴向长度缩放系数' }],
      [{ key: 'NZV导叶内加设站数' }],
    ];
    return (
      <div>
        {this.getRows(rows.slice(0, 2))}
        <Divider />
        <DoubleHeaderTable
          columns={columns}
          dataSource={this.props.module1D['OneDimensionalDgazdInputPanel.grid1']}
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

export default connect(mapStateToProps)(OneDimensionalDgazdInputPanel);
