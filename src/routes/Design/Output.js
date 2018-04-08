import React from 'react';
import { connect } from 'dva';

import { Tabs } from 'antd';
import SimpleLineChart from '../../common/core/components/D3Chart/SimpleLineChart';

const { TabPane } = { ...Tabs };


/*
const data3 = [
  {
    key: 'VA1',
    data: [
      { id: 1, value: 170.93 },
      { id: 2, value: 174.85 },
      { id: 3, value: 171.47 },
      { id: 4, value: 169.48 },
      { id: 5, value: 162.28 },
      { id: 6, value: 155.73 },
      { id: 7, value: 138.29 },
    ],
  },
  {
    key: 'VA2',
    data: [
      { id: 1, value: 160.34 },
      { id: 2, value: 165.04 },
      { id: 3, value: 165.91 },
      { id: 4, value: 164.06 },
      { id: 5, value: 154.33 },
      { id: 6, value: 143.89 },
      { id: 7, value: 124.55 },
    ],
  },
  {
    key: 'VU1',
    data: [
      { id: 1, value: 30.14 },
      { id: 2, value: 43.60 },
      { id: 3, value: 52.42 },
      { id: 4, value: 55.07 },
      { id: 5, value: 43.48 },
      { id: 6, value: 33.10 },
      { id: 7, value: 33.10 },
    ],
  },
];

const data = [
  {
    key: 'VA1',
    data: [
      [1, 170.93],
      [2, 174.85],
      [3, 171.47],
      [4, 169.48],
      [5, 162.28],
      [6, 155.73],
      [7, 138.29],
    ],
  },
  {
    key: 'VA2',
    data: [
      [1, 160.34],
      [2, 165.04],
      [3, 165.91],
      [4, 164.06],
      [5, 154.33],
      [6, 143.89],
      [7, 124.55],
    ],
  },
  {
    key: 'VU1',
    data: [
      [1, 30.14],
      [2, 43.60],
      [3, 52.42],
      [4, 55.07],
      [5, 43.48],
      [6, 33.10],
      [7, 33.10],
    ],
  },
];

const data1 = [
  [
    { id: 1, value: 170.93 },
    { id: 2, value: 174.85 },
    { id: 3, value: 171.47 },
    { id: 4, value: 169.48 },
    { id: 5, value: 162.28 },
    { id: 6, value: 155.73 },
    { id: 7, value: 138.29 },
  ],
  [
    { id: 1, value: 160.34 },
    { id: 2, value: 165.04 },
    { id: 3, value: 165.91 },
    { id: 4, value: 164.06 },
    { id: 5, value: 154.33 },
    { id: 6, value: 143.89 },
    { id: 7, value: 124.55 },
  ],
  [
    { id: 1, value: 30.14 },
    { id: 2, value: 43.60 },
    { id: 3, value: 52.42 },
    { id: 4, value: 55.07 },
    { id: 5, value: 43.48 },
    { id: 6, value: 33.10 },
    { id: 7, value: 33.10 },
  ],
];
*/
class DesignOutput extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'design/get1dOutput',
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
    data: state.design.d1_output,
  };
}

export default connect(mapStateToProps)(DesignOutput);
