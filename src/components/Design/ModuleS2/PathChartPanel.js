import React from 'react';
import { connect } from 'dva';
import { Button} from 'antd';

import S2PathChart from '../../../common/core/components/D3Chart/S2PathChart';

const sessionid = localStorage.getItem('design.client.sessionid');

const myData = [
  [20,20],
  [30,30],
  [40,40],
  [50,50],
  [60,60],
  [70,70],
];

const myData2 = [
  [30,20],
  [30,30],
  [40,40],
  [50,50],
  [60,60],
  [70,70],
]

const myData3 = [
  [120,20],
  [130,30],
  [140,40],
  [150,50],
  [160,60],
  [170,70],
]

let count = 0;

let ddd = [[]];
class DesignS2Input extends React.Component {
  constructor(props) {
    super()
    this.state = {
      data: [myData,myData3],
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'designS2/fetchData',
      payload: `input_s2_1/${sessionid}`,
    });

    if(this.props.data['ControlVariable.grid2']){
      ddd = this.getLineData(this.props.data['ControlVariable.grid2']);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    // this.setState({data:myData2})

    const data = myData2;
    if(count===0){
      data[0] = [30,20]
      count =1;
    }else{
      data[0] = [20,20]
      count =0;
    }
    // this.setState({data:[data]})
    // const ddd = this.getLineData(this.props.data['ControlVariable.grid2']);
    // ddd[46][0][0] = ddd[46][0][0]+100;
    ddd = [myData,myData3]
    // this.chart.redraw(ddd);
    const aaa = this.props.data['ControlVariable.grid2']
    //console.log(aaa)
    //aaa[0][0] = `${Number(aaa[0][0])+20}`;
    //aaa[0][1] = `${Number(aaa[0][1])+20}`;
    ddd = this.getLineData(aaa);
    this.chart.redraw(ddd)
  }

  redrawChart =() =>{
    const aaa = this.props.data['ControlVariable.grid2']
    ddd = this.getLineData(aaa);
    this.chart.redraw(ddd)
  }

  getLineData = (data) => {
    const lines =[];
    const line1 = [];
    const line2 = [];
    data.forEach(e =>{
      line1.push([e[2],e[1]]);
      line2.push([e[4],e[3]]);

      const temp = [];
      temp.push([e[2],e[1]]);
      temp.push([e[4],e[3]]);
      lines.push(temp)
    });

    lines.push(line1);
    lines.push(line2);
    return lines;
  }

  getGridData =(data)=>{
    const aaa = this.props.data['ControlVariable.grid2']
    const line1 = data[data.length-2];
    const line2 = data[data.length-1];

    const grid = [];
    line1.forEach((d,i)=>{
      const row = [];
      row.push(aaa[i][0]);
      row.push(line1[i][1]);
      row.push(line1[i][0]);
      row.push(line2[i][1]);
      row.push(line2[i][0]);
      row.push(aaa[i][5]);
      grid.push(row);
    })
    // console.log('getGridData',grid)
    return grid;
  }
  onEditChart =(data) =>{
    // console.log('onEditChart',data)
    const grid = this.getGridData(data)
    const obj = {};
    obj['ControlVariable.grid2'] = grid;
    // console.log(this.props.data['ControlVariable.grid2'],grid)

    this.props.dispatch({
      type: 'designS2/saveS2',
      payload: obj,
    });

  }
  render() {
    // console.log(this.props.data['ControlVariable.grid2'])

    // ddd = [myData]
    return (
      <div>
        <S2PathChart
          yTitle="半径R mm"
          xTitle="轴距Z mm"
          xDomain={[-800, 800]}
          yDomain={[-200, 600]}
          width={1000}
          height={500}
          data={ddd}
          ref={(c) => { this.chart = c; }}
          onEditChart={this.onEditChart}
        />
        <Button type="primary" onClick={this.handleClick}>计算</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.designS2.moduleS2,
  };
}

export default connect(mapStateToProps)(DesignS2Input);
