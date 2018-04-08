import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import CustomInput from '../../../common/core/components/CustomInput';
import { getCodeList } from '../../../common/core/CodeList';

class DesignPanel extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  getComponent = (key, callback, span) => {
    const data = this.props.module1D[key];
    const codelist = getCodeList(this.props.codelists, key);
    const width = 6;
    return (
      <Col span={width * (span || 1)}>
        <CustomInput
          data={data}
          codelist={codelist}
          span={span || 1}
          onChange={callback || this.handleChange}
        />
      </Col>
    );
  }

  getRow = (list) => {
    const cols = list.map((data => this.getComponent(data.key, data.callback, data.span)));
    return (
      <Row>
        {cols}
      </Row>
    );
  }

  getRows = (list) => {
    return list.map((data => this.getRow(data)));
  }

  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;

    this.props.dispatch({
      type: 'design/save1d',
      payload: obj,
    });
  }

  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    codelists: state.design.codelists,
    module1D: state.design.module1D,
  };
}

export default connect(mapStateToProps)(DesignPanel);
