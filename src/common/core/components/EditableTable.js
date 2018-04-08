import React from 'react';
import { Table, Popconfirm } from 'antd';
import { EditableCell } from './EditableCell';
import EditableCellSelect from './EditableCellSelect';
import EditableCellDatePicker from './EditableCellDatePicker';

export class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.operationColumns = {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.props.data[index].name;
        return (
          <div className="editable-row-operations">
            {
              editable ? (
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>保存</a>
                  <Popconfirm title="确认取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.edit(index)}>编辑</a>
                </span>
              )}
          </div>
        );
      },
    };
    this.columns = this.initColumns(props.columns);

    this.state = {
      data: props.data,
    };
  }

  initColumns = (columns) => {
    const newColumns = columns;
    //const newColumns = columns.slice(0);

    newColumns.forEach((column) => {
      column.render = (text, record, index) => {
        return this.renderColumns(this.props.data, index, column.dataIndex, text);
      };
    });
    newColumns.push(this.operationColumns);
    return newColumns;
  }

  handleChange = (key, index, value) => {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit = (index) => {
    const { data } = this.props;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone = (index, type) => {
    const { data } = this.props;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }

  reset = () => {
    this.table.dataSource = [];
  }

  renderColumns = (data, index, key, text) => {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }

    const column = this.props.columns.find((acolumn) => {
      return acolumn.dataIndex === key;
    },
    );

    if (typeof column.code !== 'undefined') {
      return (
        <EditableCellSelect
          editable={editable}
          value={text}
          code={column.code}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />
      );
    } else if (typeof column.dateFormat !== 'undefined') {
      return (
        <EditableCellDatePicker
          editable={editable}
          value={text}
          code={column.code}
          dateFormat={column.dateFormat}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />
      );
    } else {
      return (
        <EditableCell
          editable={editable}
          value={text}
          onChange={value => this.handleChange(key, index, value)}
          status={status}
        />
      );
    }
  }

  render() {
    const { data } = this.props;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });

    return (
      <Table
        {...this.props}
        bordered
        dataSource={dataSource}
        columns={this.columns}
        onChange={this.props.onChange}
        pagination={this.props.pagination}
        ref={(c) => { this.table = c; }}
        size="small"
      />
    );
  }
}

