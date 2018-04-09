import React from 'react';
import { connect } from 'dva';
import { Input, Button, Divider } from 'antd';

const { TextArea } = Input;

class DesignCalculate extends React.PureComponent {
  handleClick = (e) => {
    e.preventDefault();
    const sessionid = localStorage.getItem('design.client.sessionid');
    console.log(sessionid)
    this.props.dispatch({
      type: 'design/calculate',
      payload: sessionid,
    });
  }

  render() {
    const { data } = { ...this.props.calculate };
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>计算</Button>
        <Divider orientation='left'>计算结果</Divider>
        <TextArea
          rows={20}
          value={data}
          ref={(c) => { this.textArea = c; }}
          onChange={this.handleTextareaChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    calculate: state.design.calculate,
  };
}

export default connect(mapStateToProps)(DesignCalculate);
