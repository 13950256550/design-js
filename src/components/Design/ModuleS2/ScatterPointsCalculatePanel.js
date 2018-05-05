import React from 'react';
import { connect } from 'dva';

import DesignPanel from '../../../common/core/components/design/DesignPanel';

@DesignPanel
class ScatterPointsCalculatePanel extends React.PureComponent {

  render() {

    return (
      <div />
    );
  }
}

function mapStateToProps(state) {
  return {
    codelists: state.designS2.codelists,
    moduleData: state.designS2.moduleS2,
  };
}

export default connect(mapStateToProps)(ScatterPointsCalculatePanel);
