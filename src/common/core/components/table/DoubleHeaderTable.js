import React from 'react';
import { Input } from 'antd';

import styles from './table.less';


class DoubleHeaderTable extends React.PureComponent {
  getTableHeader = (columns,i) => {
    const trs = columns.map((data,id) => <th key={id} width={data.width}>{data.title}</th>);
    let rowh;
    if (this.props.rowHeader) {
      rowh = (<th />);
    }
    return (
      <tr key={i}>
        {rowh}{trs}
      </tr>
    );
  }

  getTableHeaders = (columns) => {
    return columns.map(this.getTableHeader)
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
        <td key={colIndex}>
          <Input
            className={styles.input}
            value={value}
            onChange={e => this.handleInputChange(e, rowIndex, colIndex)}
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
        const rows = this.getTableRowWithoutcolumns(data, index);
        return rows;
      })
    );
  }

  handleInputChange = (e, row, col) => {
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
          {this.getTableHeaders(this.props.columns)}
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    );
  }
}

export default DoubleHeaderTable;
