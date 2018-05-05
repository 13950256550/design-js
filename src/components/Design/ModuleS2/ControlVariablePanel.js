import React from 'react';
import { connect } from 'dva';
import { Row,Col,Divider,Radio } from 'antd';

import DesignPanel from '../../../common/core/components/design/DesignPanel';

@DesignPanel
class ControlVariablePanel extends React.PureComponent {

  render() {
    const rows = [
      [{ key: 'TITLE题目', span: 4 }],
      [{ key: 'TETAO光顺系数'}, { key: 'NPRK光顺次数' }, { key: 'KPR误差打印' }],
      [{ key: 'JDK分流前站序' }, { key: 'NPR迭代次数' }, { key: 'PROD继续计算控制' }],
      [{ key: 'G质量流量' }, { key: 'K等熵指数' }, { key: 'R气体常数' }],
      [{ key: 'ALFD松弛系数' }, { key: 'DELTA收敛精度' }, { key: 'NROW叶排数' }],
      [{ key: 'M计算站数' }, { key: 'JSR站输出起站' }, { key: 'JFR终站' }],
      [{ key: 'N流线数' }, { key: 'JSP汇总表起站' }, { key: 'JFP终站' }],
      [{ key: 'KGP小流管流量分布' }, { key: 'WW转向' }, { key: 'ICP变比热' }],
      [{ key: 'IDEV输入叶型角' }],
      [{ key: 'DG多步计算流量增量' }, { key: 'NM最多步数' }, { key: 'KPST每步打印' }],
      [{ key: 'PRK龙格法' }, { key: 'ATP摩擦系数' }, { key: 'MAH多重网格' }],
      [{ key: 'IDF分流尾站序' }, { key: 'SPV超音解站范围起始站' }, { key: 'FPV终止站' }],
    ];

    return (
      <div>
        <Row><Col offset={1}><Radio>内涵</Radio></Col></Row>
        {this.props.getRows(rows.slice(0, 9))}
        <Divider orientation="left">以下变量标识的功能一般不用</Divider>
        {this.props.getRows(rows.slice(9))}
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

export default connect(mapStateToProps)(ControlVariablePanel);
