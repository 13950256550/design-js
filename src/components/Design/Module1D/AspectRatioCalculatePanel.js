import React from 'react';
import { connect } from 'dva';
import { Row, Col, Divider } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';
import CustomTable from '../../../common/core/components/table/CustomTable';

const columns = [
  { key: 1, title: 'A',width:'100' },
  { key: 2, title: 'B',width:'100' },
  { key: 3, title: 'C',width:'100' },
  { key: 4, title: 'D',width:'100' },
  { key: 5, title: 'E',width:'100' },
  { key: 6, title: 'F',width:'100' },
];

class AspectRatioCalculatePanel extends React.PureComponent {
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
      [{ key: '1.IZAP=1  必须计算共同工作点', type: 'typeLabel' }],
      [{ key: '2.LSR=1  必须计算共同工作线工作点', type: 'typeLabel' }],
      [{ key: '3.此计算只用前三个计算结果', type: 'typeLabel' }],
      [{ key: '喘振裕度输入NCU' },{ key: '(=3 输入,≠不输,用程序值)', type: 'typeLabel' }],
      [{ key: '喘振裕度 SM (NCU=3)', type: 'typeLabel' }],
    ];
    return (
      <div>
        <Divider orientation='left'>此计算"在设计(检查)+特性后进行",前面输入数据应注意:</Divider>
        {this.getRows(rows.slice(0, 3))}
        <Divider />
        {this.getRows(rows.slice(3, 5))}
        <CustomTable
          columns={columns}
          dataSource={this.props.module1D['AspectRatioCalculatePanel.grid1']}
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

export default connect(mapStateToProps)(AspectRatioCalculatePanel);
