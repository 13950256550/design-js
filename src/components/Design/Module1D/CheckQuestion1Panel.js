import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';

class CheckQuestion1Panel extends React.PureComponent {
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

  handleTableChange = (value, row, col) => {
    console.log(value, row, col);
  };

  render() {
    const rows = [
      [{ key: 'RPM转速度或第一级转子叶尖切线速度', span: 2, type: 'longLabel' }, { key: '(K==1或K==3或K==4且K12==2)', type: 'typeLabel' }],
      [{ key: 'PR总压比' }, { key: 'G流量' }, { key: 'PO进口总压' }, { key: 'TO进口总温' }],
      [{ key: 'EFF绝热效率' }, { key: 'ISTAGE级数' }],
      [{ key: 'KH功率存储系数' }, { key: 'KPATH流路输入标识' }, { key: 'KF叶型标识' }],
      [{ key: 'KC压气机类型' }, { key: 'SIGO进口段总压恢复' }, { key: 'SIGV进口导叶总压恢复' }],
      [{ key: 'DTK外径' }, { key: 'DHK内径' }, { key: 'ALFO一转进气流角' }],
      [{ key: 'KH1第一级' }, { key: 'DKH逐级递减' }, { key: 'KHMIN最小值' }],
      [{ key: 'ALF1一转进气流角' }, { key: 'OMGN第中级反力度' }, { key: 'DOMG第中级后反力度增量' }, { key: 'ALFK最后静子出口气流角' }],
      [{ key: 'HZ1第一级' }, { key: 'HZM平均级' }, { key: 'HZK最后级' }],
      [{ key: 'KH1第一级' }, { key: 'DKH逐级递减值' }, { key: 'KHMIN最小值' }],
      [{ key: 'KG流量缩放系数' }, { key: 'ASP1一转展旋比' }, { key: 'ASPK最后级展旋比' }],
      [{ key: 'ABV进口导叶' }, { key: 'ABR转子叶片' }, { key: 'ABS静子叶片' }],
      [{ key: 'BTHV尖根弦长比' }, { key: 'ASPV展弦比' }, { key: 'BTV稠度' }],
      [{ key: 'DHO出口内直径' }, { key: 'DTO出口外直径' }],
      [{ key: 'BTH1一转尖根弦长比' }, { key: 'CMV进口导叶最大相对厚度' }],
      [{ key: 'DENB叶片' }, { key: 'λ085填10","λ≯0.85,填1.0', type: 'typeLabel' }, { key: 'DRES转子根许用应力' }],
      [{ key: 'E1第一级' }, { key: 'DE最后级与第一级差' }],
      [{ key: 'DENR转件' }, { key: 'DENS静件' }, { key: 'DENB叶片' }],
      [{ key: 'DRES转子根许用应力' }, { key: 'ALFK最后静子出口气流角' }],
      [{ key: 'PRO本气压机前已有压比' }, { key: 'HORDA最小弦比' }],
    ];
    return (
      <div>
        {this.getRows(rows)}
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

export default connect(mapStateToProps)(CheckQuestion1Panel);
