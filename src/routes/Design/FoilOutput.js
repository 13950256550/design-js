import React from 'react';
import { connect } from 'dva';

import { Tabs } from 'antd';
import SimpleLineChart from '../../common/core/components/D3Chart/SimpleLineChart';

const { TabPane } = { ...Tabs };

class DesignFoilOutput extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'design/getFoilData',
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
          <TabPane tab="最大相对厚度" key="0">
            <SimpleLineChart
              yTitle="最大相对厚度CMAX"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(2, 4)}
            />
          </TabPane>
          <TabPane tab="叶片角" key="1">
            <SimpleLineChart
              yTitle="叶片角"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(4, 8)}
            />
          </TabPane>
          <TabPane tab="功角" key="2">
            <SimpleLineChart
              yTitle="功角"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(10, 12)}
            />
          </TabPane>
          <TabPane tab="落后角" key="3">
            <SimpleLineChart
              yTitle="落后角"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(12, 14)}
            />
          </TabPane>
          <TabPane tab="展弦比稠度" key="4">
            <SimpleLineChart
              yTitle="展弦比稠度"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(16, 20)}
            />
          </TabPane>
          <TabPane tab="弯角" key="5">
            <SimpleLineChart
              yTitle="弯角CAMBER"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(20, 22)}
            />
          </TabPane>
          <TabPane tab="弦长" key="6">
            <SimpleLineChart
              yTitle="弦长BB"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(8, 10)}
            />
          </TabPane>
          <TabPane tab="槽道面积裕度" key="7">
            <SimpleLineChart
              yTitle="槽道面积裕度"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(14, 16)}
            />
          </TabPane>
          <TabPane tab="叶片数" key="8">
            <SimpleLineChart
              yTitle="叶片数"
              xTitle="级数"
              xDomain={[0, 8]}
              // yDomain={[20, 200]}
              width={1000}
              height={500}
              data={data.slice(0, 2)}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.design.foil,
  };
}

export default connect(mapStateToProps)(DesignFoilOutput);
