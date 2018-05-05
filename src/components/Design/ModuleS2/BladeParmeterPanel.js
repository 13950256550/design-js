import React from 'react';
import { connect } from 'dva';
import { Row,Col,Divider,Radio,Button,Select } from 'antd';

import {getSelectOptions} from '../../../common/core/CodeList';

import DesignPanel from '../../../common/core/components/design/DesignPanel';
import DoubleHeaderTable from '../../../common/core/components/table/DoubleHeaderTable';

const columns = [
  [
    { key: 1, title: 'FHR', width: '10%' },
    { key: 2, title: 'SIGS', width: '10%' },
    { key: 3, title: 'ALF', width: '10%' },
    { key: 4, title: 'DTH', width: '10%' },
    { key: 5, title: 'DTM', width: '10%' },
    { key: 6, title: 'DTT', width: '10%' },
  ],
  [
    { key: 1, title: '出口给定据点高度',  width: '10%' },
    { key: 2, title: '静子总压恢复', width: '10%' },
    { key: 3, title: '出口气流角', width: '10%' },
    { key: 4, title: '根部各站厚度', width: '10%' },
    { key: 5, title: '中部各站厚度', width: '10%' },
    { key: 6, title: '尖部各站厚度', width: '10%' },
  ],
];

@DesignPanel
class BladeParmeterPanel extends React.PureComponent {
  getNRowSelectionComponent = (nrow) =>{
    const option = [];
    for(let i=1;i<=nrow;i+=1){
      option.push({key:i,value:i})
    }
    return (
      <Select  style={{ width: 120 }} value={1}>
        {option.map(codeObject => <Select.Option key={codeObject.key}>{`${codeObject.key}`}</Select.Option>)}
      </Select>
    )
  }
  render() {
    const rows = [
      /*
      [{ key: 'IZ叶片数',type:'longLabel2',span: 1.5}, { key: 'W转动角速度' }],
      [{ key: 'RMH根',type:'longLabel2',span: 1.5}, { key: 'RMM中' }, { key: 'RMT尖' }],
      [{ key: 'PQ功分布标识',type:'longLabel2',span: 1.5 }],
      [{ key: 'QFH根',type:'longLabel2',span: 1.5}, { key: 'QFM中' }, { key: 'QFT尖' }],
      [{ key: 'QSH根',type:'longLabel2',span: 1.5}, { key: 'QSM中' }, { key: 'QST尖' }],
      [{ key: 'PX叶片力计入控制'}],
      [{ key: 'TAU1前跟'}, { key: 'TAU2轴中' }, { key: 'TAU3尾尖' }],
      [{ key: 'DIZ多步计算叶片数增量'}, { key: 'DW角速度增量' }, { key: 'NL计算步数' }],
      [{ key: 'GRL绘图控制'}, { key: 'GRT' }, { key: 'KH增压系数' }, { key: 'KG流量系数' }],
      */
      [{ key: 'IZ叶片数',type:'longLabel2',span: 1.5}, { key: 'W转动角速度' }],
      [{ key: 'RMH根',type:'longLabel2',span: 1.5}, { key: 'RMM中' }, { key: 'RMT尖' }],
      [{ key: 'PQ功分布标识',type:'longLabel2',span: 1.5 }],
      [{ key: 'QFH根',type:'longLabel2',span: 1.5}, { key: 'QFM中' }, { key: 'QFT尖' }],
      [{ key: 'QSH根',type:'longLabel2',span: 1.5}, { key: 'QSM中' }, { key: 'QST尖' }],
      [{ key: 'PX叶片力计入控制'}],
      [{ key: 'TAU1前跟'}, { key: 'TAU2轴中' }, { key: 'TAU3尾尖' }],
      [{ key: 'DIZ多步计算叶片数增量'}, { key: 'DW角速度增量' }, { key: 'NL计算步数' }],
      [{ key: 'GRL绘图控制'}, { key: 'GRT' }, { key: 'KH增压系数' }, { key: 'KG流量系数' }],
    ];

    if(this.props.moduleData){
      const nrow = Number(this.props.nrow.value)
      const component = this.getNRowSelectionComponent(nrow);
      return (
        <div>
          <Row>
            <Col span={20}>
              <div>
                <Row>
                  <Col span={4} offset={2}><Radio>内涵</Radio></Col>
                  <Col><span>叶排序号</span>{component}</Col>
                </Row>
                <Divider orientation="left">叶排计算控制参数</Divider>
                {this.props.getRows(rows.slice(0, 5))}
              </div>
            </Col>
            <Col span={4}>
              <div>
                <Row>
                  <Button>拷贝到</Button>
                </Row>
                <Row>
                  {component}
                </Row>
              </div>
            </Col>
          </Row>
          <Divider orientation="left">叶排参数径向分布</Divider>
          <Row>
            {this.props.getComponent({ key: 'PB解题形式识' })}
            <Col offset={2} span={2}><Radio>数据</Radio></Col>
            <Col span={2}>图线</Col>
            <Col span={2}><Radio>SIGS</Radio></Col>
            <Col span={2}><Radio>VUS</Radio></Col>
          </Row>
          <Divider />
          <DoubleHeaderTable
            columns={columns}
            dataSource={this.props.moduleData['ControlVariable.grid3']}
            onTableChange={this.handleTableChange}
          />
          <Divider orientation="left">以下参数标识的功能现通常不用</Divider>
          {this.props.getRows(rows.slice(5))}
        </div>
      );
    }else{
      return (<div />);
    }

  }
}

function mapStateToProps(state) {
  return {
    codelists: state.designS2.codelists,
    moduleData: state.designS2.moduleS2['ControlVariable.nrowMap']['1'],
    nrow:state.designS2.moduleS2['NROW叶排数'],
  };
}

export default connect(mapStateToProps)(BladeParmeterPanel);
