import React from 'react';
import { connect } from 'dva';
import { Tabs, Input } from 'antd';

import ControlVariablePanel from '../../components/Design/Module1D/ControlVariablePanel';
import DesignProblemPanel from '../../components/Design/Module1D/DesignProblemPanel';
import CheckQuestion1Panel from '../../components/Design/Module1D/CheckQuestion1Panel';
import CheckQuestion2Panel from '../../components/Design/Module1D/CheckQuestion2Panel';
import CheckQuestion3Panel from '../../components/Design/Module1D/CheckQuestion3Panel';
import FeaturesCalculate1Panel from '../../components/Design/Module1D/FeaturesCalculate1Panel';
import FeaturesCalculate2Panel from '../../components/Design/Module1D/FeaturesCalculate2Panel';
import FeaturesCalculate3Panel from '../../components/Design/Module1D/FeaturesCalculate3Panel';
import AspectRatioCalculatePanel from '../../components/Design/Module1D/AspectRatioCalculatePanel';

const { TextArea } = Input;
const { TabPane } = { ...Tabs };

const sessionid = localStorage.getItem('design.client.sessionid');

class Design extends React.PureComponent {
  currentSelectedTabIndex = '0'
  componentWillMount() {
    this.props.dispatch({
      type: 'design/fetchData',
      payload: `input_1d_1/${sessionid}`,
    });

    this.props.dispatch({
      type: 'design/fetchCodeList',
      payload: '1D',
    });

    this.props.dispatch({
      type: 'design/getFile',
      payload: `input_1d_1/${sessionid}`,
    });
  }

  callback = (key) => {
    if (key === '0') {
      this.props.dispatch({
        type: 'design/updateData',
        payload: `input_1d_1/${sessionid}`,
      });
    } else if (this.currentSelectedTabIndex === '0') {
      this.props.dispatch({
        type: 'design/updateFile',
        payload: `input_1d_1/${sessionid}`,
      });
    }
    this.currentSelectedTabIndex = key;
  }

  handleTextareaChange = (e) => {
    e.preventDefault();
    /*
    this.setState({
      file: { data: e.target.value },
    });
    */
    this.props.dispatch({
      type: 'design/saveFile',
      payload: {input_1d_1:{ data: e.target.value }},
    });
  }

  render() {
    let { data } = { ...this.props.file.input_1d_1 };
    if(!data){
      data = {}
    }

    return (
      <div>
        <Tabs onChange={this.callback} type="card" size="small">
          <TabPane tab="输入文件" key="0">
            <TextArea
              rows={20}
              // defaultValue={data}
              value={data}
              ref={(c) => { this.textArea = c; }}
              onChange={this.handleTextareaChange}
            />
          </TabPane>
          <TabPane tab="控制变量" key="1">
            <ControlVariablePanel />
          </TabPane>
          <TabPane tab="设计问题" key="2" >
            <DesignProblemPanel />
          </TabPane>
          <TabPane tab="检查问题(1)" key="3" >
            <CheckQuestion1Panel />
          </TabPane>
          <TabPane tab="检查问题(2)" key="4" >
            <CheckQuestion2Panel />
          </TabPane>
          <TabPane tab="检查问题(3)" key="5" >
            <CheckQuestion3Panel />
          </TabPane>
          <TabPane tab="特性计算(1)" key="6" >
            <FeaturesCalculate1Panel />
          </TabPane>
          <TabPane tab="特性计算(2)" key="7" >
            <FeaturesCalculate2Panel />
          </TabPane>
          <TabPane tab="特性计算(3)" key="8" >
            <FeaturesCalculate3Panel />
          </TabPane>
          <TabPane tab="展弦比计算)" key="9" >
            <AspectRatioCalculatePanel />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    file: state.design.file,
  };
}

export default connect(mapStateToProps)(Design);
