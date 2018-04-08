import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import styles from './CustomInput.less';

class CustomTable extends React.PureComponent {
  render() {
    return (
      <div>
        <Table columns={this.props.columns} />
      </div>
    );
  }
}

export default connect()(CustomTable);
