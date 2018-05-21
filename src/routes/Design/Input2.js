import React from 'react';
import { connect } from 'dva';
import { Tabs, Input } from 'antd';

import OneDimensionalDgazdInputPanel from '../../components/Design/Module1D/OneDimensionalDgazdInputPanel';

const { TextArea } = Input;
const { TabPane } = { ...Tabs };

const sessionid = localStorage.getItem('design.client.sessionid');

class DesignInput2 extends React.PureComponent {
  currentSelectedTabIndex = '0'
  componentWillMount() {
    this.props.dispatch({
      type: 'design/fetchData',
      payload: `input_1d_2/${sessionid}`,
    });

    this.props.dispatch({
      type: 'design/getFile',
      payload: `input_1d_2/${sessionid}`,
    });
  }

  callback = (key) => {
    if (key === '0') {
      this.props.dispatch({
        type: 'design/updateData',
        payload: `input_1d_2/${sessionid}`,
      });
    } else if (this.currentSelectedTabIndex === '0') {
      this.props.dispatch({
        type: 'design/updateFile',
        payload: `input_1d_2/${sessionid}`,
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
      payload: {input_1d_2:{ data: e.target.value }},
    });
  }

  render() {
    let { data } = { ...this.props.file.input_1d_2 };
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
          <TabPane tab="一维计算DGAZD.D输入界面" key="1">
            <OneDimensionalDgazdInputPanel />
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

export default connect(mapStateToProps)(DesignInput2);
