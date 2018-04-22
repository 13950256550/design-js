import React from 'react';
import { connect } from 'dva';

import { Tabs } from 'antd';
import SimpleLineChart from '../../common/core/components/D3Chart/SimpleLineChart';

const { TabPane } = { ...Tabs };

class DesignAeroOutput extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'design/getAeroData',
    });
  }

  render() {
    let { data } = { ...this.props };
    if (!data) {
      data = [];
    }

    return (
      <div>
        <Tabs onChange={this.callback} type="card" size="small">
          <TabPane tab="速度" key="0">
            <SimpleLineChart
              yTitle="速度m/s"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(0, 3)}
            />
          </TabPane>
          <TabPane tab="气流角" key="1">
            <SimpleLineChart
              yTitle="气流角"
              xTitle="级数"
              xDomain={[0, 8]}
            // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(3, 7)}
            />
          </TabPane>
          <TabPane tab="气动参数" key="2">
            <SimpleLineChart
              yTitle="气动参数"
              xTitle="级数"
              xDomain={[0, 8]}
            // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(7, 10)}
            />
          </TabPane>
          <TabPane tab="压比" key="3">
            <SimpleLineChart
              yTitle="压比"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(10, 12)}
            />
          </TabPane>
          <TabPane tab="绝热效率" key="4">
            <SimpleLineChart
              yTitle="绝热效率"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(12, 14)}
            />
          </TabPane>
          <TabPane tab="扩散因子" key="5">
            <SimpleLineChart
              yTitle="扩散因子"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(14, 16)}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.design.aero,
  };
}

export default connect(mapStateToProps)(DesignAeroOutput);
