import React from 'react';
import { connect } from 'dva';

import { Tabs } from 'antd';
import PrefChart from '../../common/core/components/D3Chart/PrefChart';

const { TabPane } = { ...Tabs };

class DesignPrefOutput extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'design/getPrefData',
    });
  }

  render() {
    let { data1, data2, data3 } = { ...this.props };
    if(!data1){
      data1=[];
      data2=[];
      data3=[];
    }
    return (
      <div>
        <Tabs onChange={this.callback} type="card" size="small">
          <TabPane tab="EFF-G" key="0">
            <PrefChart
              yTitle=""
              xTitle=""
              // xDomain={[8, 28]}
              // yDomain={[0.6, 0.9]}
              width={1000}
              height={500}
              data={data1}
            />
          </TabPane>
          <TabPane tab="PR-G" key="1">
            <PrefChart
              yTitle=""
              xTitle=""
              // xDomain={[8, 32]}
              // yDomain={[0, 12]}
              width={1000}
              height={500}
              data={data2}
            />
          </TabPane>
          <TabPane tab="PR-EFF" key="2">
            <PrefChart
              yTitle=""
              xTitle=""
              // xDomain={[0.6, 0.9]}
              // yDomain={[0, 12]}
              width={1000}
              height={500}
              data={data3}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data1: state.design.pref.chart1,
    data2: state.design.pref.chart2,
    data3: state.design.pref.chart3,
  };
}

export default connect(mapStateToProps)(DesignPrefOutput);
