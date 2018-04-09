import React from 'react';
import { connect } from 'dva';
import { Tabs, Input } from 'antd';

import OneDimensionalDgazdInputPanel from '../../components/Design/Module1D/OneDimensionalDgazdInputPanel';

const { TextArea } = Input;
const { TabPane } = { ...Tabs };

class DesignInput2 extends React.PureComponent {
  currentSelectedTabIndex = '0'
  componentWillMount() {
    this.props.dispatch({
      type: 'design/fetchData',
      payload: '1D_IN1',
    });

    this.props.dispatch({
      type: 'design/fetchCodeList',
      payload: '1D',
    });

    this.props.dispatch({
      type: 'design/getFile',
      payload: '1D/1d_in1',
    });
  }

  callback = (key) => {
    if (key === '0') {
      /*
      this.props.dispatch({
        type: 'design/updateData',
      });
      */
      /*
      this.props.dispatch({
        type: 'design/updateFile',
        payload: this.state.file,
      });
      */
      console.log('update data');
    } else if (this.currentSelectedTabIndex === '0') {
      console.log('update file');
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
      payload: { data: e.target.value },
    });
  }

  render() {
    const { data } = { ...this.props.file };
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
