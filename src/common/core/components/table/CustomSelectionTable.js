import React from 'react';
import { Input,Select } from 'antd';

import styles from './table.less';
import { getSelectOptions } from '../../CodeList';

class CustomSelectionTable extends React.PureComponent {

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

  getInputComponent = (value,rowIndex,colIndex) => {
    return (
      <Input
        className={styles.input}
        value={value}
        onChange={e => this.handleInputChange(e, rowIndex, colIndex)}
        row={rowIndex}
        col={colIndex}
      />
    );
  }

  getSelectComponent = (codelist, value,rowIndex,colIndex) => {
    return (
      <Select
        className={styles.input2}
        value={value}
        onChange={v => this.handleSelectChange(v, rowIndex, colIndex)}
        size="small"
      >
        {getSelectOptions(codelist)}
      </Select>
    );
  }

  getTableRow = (data, rowIndex,columns) => {
    const rows = data.map((value, colIndex) => {
      let Component;
      if(columns[colIndex].option){
        Component = this.getSelectComponent(columns[colIndex].option,value,rowIndex,colIndex);
      }else{
        Component = this.getInputComponent(value,rowIndex,colIndex);
      }

      return (
        <td key={colIndex}>
          {Component}
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
        const rows = this.getTableRow(data, index,columns);
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

  handleInputChange = (e, row, col) => {
    e.preventDefault();
    if (this.props.onTableChange) {
      this.props.onTableChange(e.target.value, row, col,this.props.id);
    }
  };

  handleSelectChange = (value, row, col) => {
    if (this.props.onTableChange) {
      this.props.onTableChange(value, row, col,this.props.id);
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

export default CustomSelectionTable;
