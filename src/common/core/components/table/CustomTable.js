import React from 'react';
import { Input } from 'antd';

import styles from './table.less';


class CustomTable extends React.PureComponent {
  getTableHeader = (columns) => {
    const trs = columns.map(data => <th>{data.title}</th>);
    let rowh;
    if (this.props.rowHeader) {
      rowh = (<th />);
    }
    return (
      <tr>
        {rowh}{trs}
      </tr>
    );
  }

  getTableRow = (data, columns) => {
    return (
      <tr>
        {
          columns.map((column) => {
            const value = data[column.dataIndex];
            return (
              <td>
                <Input
                  className={styles.input}
                  defaultValue={value}
                  onPressEnter={this.handleInputChange}
                />
              </td>
            );
          })
        }
      </tr>
    );
  }

  getTableRowWithoutcolumns = (data, rowIndex) => {
    const rows = data.map((value, colIndex) => {
      return (
        <td>
          <Input
            className={styles.input}
            defaultValue={value}
            onPressEnter={e => this.handleTableChange(e, rowIndex, colIndex)}
            row={rowIndex}
            col={colIndex}
          />
        </td>
      );
    });

    let rowh;
    if (this.props.rowHeader) {
      rowh = (<th>{this.props.rowHeader[rowIndex]}</th>);
    }
    return (
      <tr>
        {rowh}{rows}
      </tr>
    );
  }

  getTableData = (list, columns) => {
    return (
      list.map((data, index) => {
        const rows = this.getTableRowWithoutcolumns(data, index);
        return rows;
      })
    );
  }

  handleTableChange = (e, row, col) => {
    e.preventDefault();
    if (this.props.onTableChange) {
      this.props.onTableChange(e.target.value, row, col);
    }
  };
  render() {
    let data;
    if (this.props.dataSource && this.props.columns) {
      data = this.getTableData(this.props.dataSource, this.props.columns);
    }
    return (
      <table className={styles.gridtable}>
        {this.getTableHeader(this.props.columns)}
        {data}
      </table>
    );
  }
}

export default CustomTable;
