import React from 'react';
import { Input } from 'antd';

import styles from './table.less';

class CustomTable extends React.PureComponent {

  getTableHeader = (columns) => {
    const trs = columns.map((data,i) => <th key={i} width={data.width}>{data.title}</th>);
    let rowh;
    if (this.props.rowHeader) {
      rowh = (<th width="8%" />);
    }
    return (
      <tr>
        {rowh}{trs}
      </tr>
    );
  }

  getTableRow = (data, columns) => {
    return (
      <tr key={columns}>
        {
          columns.map((column,index) => {
            const value = data[column.dataIndex];
            return (
              <td key={index}>
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

  getTableRowWithoutColumns = (data, rowIndex) => {
    const rows = data.map((value, colIndex) => {
      return (
        <td key={colIndex}>
          <Input
            className={styles.input}
            defaultValue={value}
            onChange={e => this.handleTableChange(e, rowIndex, colIndex)}
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
      <tr key={rowIndex}>
        {rowh}{rows}
      </tr>
    );
  }

  getTableData = (list, columns) => {
    return (
      list.map((data, index) => {
        const rows = this.getTableRowWithoutColumns(data, index);
        return rows;
      })
    );
  }

  handleTableChange = (e, row, col) => {
    e.preventDefault();
    if (this.props.onTableChange) {
      this.props.onTableChange(e.target.value, row, col,this.props.id);
    }
  };
  render() {
    let data;
    if (this.props.dataSource && this.props.columns) {
      data = this.getTableData(this.props.dataSource, this.props.columns);
    }
    return (
      <table className={styles.gridtable}>
        <thead>
          {this.getTableHeader(this.props.columns)}
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    );
  }
}

export default CustomTable;
