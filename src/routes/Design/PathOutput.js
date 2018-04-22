import React from 'react';
import { connect } from 'dva';

import PathChart from '../../common/core/components/D3Chart/PathChart';

class DesignPathOutput extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'design/getPathData',
    });
  }

  render() {
    let { data } = { ...this.props };
    if (!data) {
      data = [];
    }
    return (
      <div>
        <PathChart
          yTitle=""
          xTitle=""
          xDomain={[-0.01, 0.455]}
          yDomain={[0.1, 0.35]}
          width={1000}
          height={500}
          data={data}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.design.path,
  };
}

export default connect(mapStateToProps)(DesignPathOutput);
