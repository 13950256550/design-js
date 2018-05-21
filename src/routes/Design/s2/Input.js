import React from 'react';
import { connect } from 'dva';
import { Tabs, Input } from 'antd';

import PathChartPanel from '../../../components/Design/ModuleS2/PathChartPanel';
import ControlVariablePanel from '../../../components/Design/ModuleS2/ControlVariablePanel';
import BladeAnglePanel from '../../../components/Design/ModuleS2/BladeAnglePanel';
import EnterConditionPanel from '../../../components/Design/ModuleS2/EnterConditionPanel';
import FlowPathAndBoundaryLayerPanel from '../../../components/Design/ModuleS2/FlowPathAndBoundaryLayerPanel';
import ScatterPointsCalculatePanel from '../../../components/Design/ModuleS2/ScatterPointsCalculatePanel';
import BladeParmeterPanel from '../../../components/Design/ModuleS2/BladeParmeterPanel';
import FlowRatioPanel from '../../../components/Design/ModuleS2/FlowRatioPanel';
import {copyObject} from '../../../common/core/utils';

const { TextArea } = Input;
const { TabPane } = { ...Tabs };

const sessionid = localStorage.getItem('design.client.sessionid');

class DesignS2Input extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      nrowid:1,
      nrowMap: {},
    };
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'designS2/fetchData',
      payload: `input_s2_1/${sessionid}`,
    });

    this.props.dispatch({
      type: 'designS2/fetchCodeList',
      payload: 'S2',
    });

    this.props.dispatch({
      type: 'designS2/getFile',
      payload: `input_s2_1/${sessionid}`,
    });
  }

  componentWillReceiveProps(nextProps) {
    const newid = this.state.nrowid
    let map = {}
    if(nextProps.moduleS2NrowMap){
      map = nextProps.moduleS2NrowMap[newid]
    }

    this.setState({
      nrowid:newid,
      nrowMap: map,
    })
  }

  callback = (key) => {
    if (key === '0') {
      this.props.dispatch({
        type: 'designS2/updateData',
        payload: `input_s2_1/${sessionid}`,
      });
    } else if (this.currentSelectedTabIndex === '0') {
      this.props.dispatch({
        type: 'designS2/updateFile',
        payload: `input_s2_1/${sessionid}`,
      });
    }

    if (key === '1') {
      // console.log(this.pathChart)
      if(this.pathChart && this.pathChart.redrawChart){
        console.log(this.pathChart)
        this.pathChart.redrawChart()
      }
    }
    this.currentSelectedTabIndex = key;
  }

  currentSelectedTabIndex = '0'

  handleTextareaChange = (e) => {
    this.props.dispatch({
      type: 'designS2/saveFile',
      payload: {input_s2_1:{ data: e.target.value }},
    });
  }

  handleChange = (key, data) => {
    const obj = {};
    obj[key] = data;

    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: obj,
    });
  }

  handleCopy = (srcId,dstId) =>{
    const moduleData = {}
    moduleData['ControlVariable.nrowMap'] = {...this.props.moduleS2NrowMap}
    moduleData['ControlVariable.nrowMap'][dstId] = copyObject(moduleData['ControlVariable.nrowMap'][srcId])
    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: moduleData,
    });
  }

  handleChange2 = (key, data) => {
    /*
    const moduleData = {}
    moduleData['ControlVariable.nrowMap'] = {...this.props.moduleS2NrowMap}
    moduleData['ControlVariable.nrowMap'][this.state.nrowid][key] = copyObject(data)
    console.log(key, data,moduleData)
    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: moduleData,
    });
    */

    const moduleData = {...this.props.moduleS2NrowMap[this.state.nrowid]}
    moduleData[key] = {...data}

    this.props.dispatch({
      type: 'designS2/saveS2NrowMap',
      key:this.state.nrowid,
      payload: moduleData,
    });
  }

  changeDataSource = (nrowid) =>{
    this.setState({
      nrowid,
      nrowMap: this.props.moduleS2NrowMap[nrowid],
    })
  }
  render() {
    let { data } = { ...this.props.file.input_s2_1 };
    if(!data){
      data = {}
    }

    return (
      <div>
        <Tabs onChange={this.callback} type="card" size="small">
          <TabPane tab="输入文件" key="0">
            <TextArea
              rows={20}
              value={data}
              ref={(c) => { this.textArea = c; }}
              onChange={this.handleTextareaChange}
            />
          </TabPane>
          <TabPane tab="流路图" key="1">
            <PathChartPanel ref={(c) => { this.pathChart = c; }} />
          </TabPane>
          <TabPane tab="控制变量/总参数" key="2">
            <ControlVariablePanel handleChange={this.handleChange} />
          </TabPane>
          <TabPane tab="叶排叶型角" key="3">
            <BladeAnglePanel handleChange={this.handleChange} />
          </TabPane>
          <TabPane tab="进口条件" key="4">
            <EnterConditionPanel handleChange={this.handleChange} />
          </TabPane>
          <TabPane tab="流路和附面层堵塞系数" key="5">
            <FlowPathAndBoundaryLayerPanel handleChange={this.handleChange} />
          </TabPane>
          <TabPane tab="离散点计算站" key="6">
            <ScatterPointsCalculatePanel handleChange={this.handleChange} />
          </TabPane>
          <TabPane tab="叶排参数" key="7">
            <BladeParmeterPanel
              handleChange={this.handleChange2}
              changeDataSource={this.changeDataSource}
              handleCopy={this.handleCopy}
              moduleData={this.state.nrowMap}
              nrowid={this.state.nrowid}
            />
          </TabPane>
          <TabPane tab="流量比" key="8">
            <FlowRatioPanel handleChange={this.handleChange} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    file: state.designS2.file,
    moduleS2NrowMap: state.designS2.moduleS2['ControlVariable.nrowMap'],
  };
}

export default connect(mapStateToProps)(DesignS2Input);
