import React from 'react';
import * as d3 from 'd3';

import { copyGrid } from '../../utils';

class S2PathChart extends React.Component {
  state = {
    data: this.props.data,
  }
  getX = () =>{
    return d3.scaleLinear() // 定义x轴
      .domain(this.props.xDomain)
      .range([0, this.chartWidth]);
  }

  getY = () =>{
    return d3.scaleLinear() // 定义y轴
      .domain(this.props.yDomain)
      .range([this.chartHeight, 0]);
  }

  getLine = () =>{
    return d3.line()
      .curve(d3.curveLinear)
      .x((d) => {return this.getX()(d[0]) })
      .y((d) => { return this.getY()(d[1]) });
  }

  redraw = (data) => {
    // const serie = this.myChart.selectAll('.serie')
      // .data(data)
    /*
    const enter = serie.enter();
    const exit = serie.exit();
    console.log(serie)
    console.log(enter)
    console.log(exit)
    */
    // console.log(data)
    // serie.remove();

    // enter.append('path').attr("d", (d,i) => {console.log(d,i);return this.getLine()(d)});

    // serie.selectAll('path').attr("d",this.getLine());

    // exit.remove();
    this.setState({ data });
    this.drawLine();
  }

  getPoint = (line,point)=> {
    const result = {};
    // const temp = [this.getX().invert(point[0]),this.getY().invert(point[1])]
    let distance = 10000000;
    line.forEach((e,i)=>{
      const ddd = (Math.pow((e[0]-point[0]),2)+Math.pow((e[1]-point[1]),2))
      if(ddd<distance){
        distance = ddd;
        result.data = e;
        result.pointId = i;
        result.line = line;
      }
    });

    result.screenPoint = this.getScreenPoint(result.data)
    return result;
  }

  getScreenPoint = (screenPoint)=>{
    return [this.getX()(screenPoint[0]).toFixed(2),this.getY()(screenPoint[1]).toFixed(2)]
  }

  getAxisPoint = (dataPoint)=>{
    return [this.getX().invert(dataPoint[0]).toFixed(2),this.getY().invert(dataPoint[1]).toFixed(2)]
  }

  drawCircle = (data) => {
    this.myChart.selectAll("circle").remove()
    this.myChart.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .on("mousedown", () => { this.drag = true })
      .attr("r", 5)
      .attr("cx", (d) => { return d[0]; })
      .attr("cy", (d) => { return d[1]; });
  }

  drawLine = () => {
    this.myChart.selectAll('.serie').remove();
    const serie = this.myChart.selectAll('.serie')
      .data(this.state.data)
      .enter().append('g')
      .attr('class', 'serie');

    const propsData = this.state.data
    serie.append('path')
      .style('stroke', 'rgba(255,0,0,0.5)')
      .style('stroke-width', 1.5)
      .on("click", (d,i)=>{
        if((i+2)>=propsData.length){
          const mousePoint = d3.mouse(this.myChart.node());
          this.select = this.getPoint(d,this.getAxisPoint(mousePoint));
          this.select.lineId = i;
          this.drawCircle([this.select.screenPoint]);
        }
      })
      .on('dblclick',()=>{
        this.myChart.selectAll("circle").remove()
      })
      .on("mouseover", function(d,i) {
        if(i+2>=propsData.length){
          d3.select(this).style("stroke-width",5)
        }
      })
      .on("mouseout", function(d,i) {
        if(i+2>=propsData.length){
          d3.select(this).style("stroke-width",1.5)
        }
      })
      .attr('fill', 'none')
      .attr('d', this.getLine());

  }

  keydown =() =>{
    // console.log(d3.event.keyCode)
  }

  mousemove =() =>{
    d3.event.preventDefault();
    if(this.drag){
      const mousePoint = d3.mouse(this.myChart.node())
      const axisPoint = this.getAxisPoint(mousePoint);
      this.myChart.selectAll("circle").remove()

      // this.props.onMouseMove(this.select,temp);
      this.select.data[0] = axisPoint[0];
      this.select.data[1] = axisPoint[1];

      const line = this.state.data[this.select.pointId]
      const pointId = (this.select.lineId-this.state.data.length)+2

      line[pointId][0] = axisPoint[0];
      line[pointId][1] = axisPoint[1];

      // console.log(line[pointId],this.state.data)
      // this.setState({data:copy})

      const line2 = this.state.data[this.select.lineId]
      line2[this.select.pointId][0] = axisPoint[0];
      line2[this.select.pointId][1] = axisPoint[1];

      //console.log(this.select,this.state.data)

      this.drawLine()
      this.drawCircle([mousePoint])
    }
  }

  mouseup =() =>{
    d3.event.preventDefault();
    if(this.drag) {
      this.drag = false;
      this.myChart.selectAll("circle").remove()
      this.props.onEditChart(this.state.data)
    }
  }

  componentDidMount() {
    // const containerWidth = this.chartRef.parentElement.offsetWidth;
    const containerWidth = this.props.width;
    const margin = { top: 50, right: 20, bottom: 130, left: 50 };
    const width = containerWidth - margin.left - margin.right - 300;
    const height = this.props.height - margin.top - margin.bottom;
    this.chartWidth = width;
    this.chartHeight = height;

    const z = d3.scaleOrdinal(d3.schemeCategory10);// 通用线条的颜色

    d3.select(window)
      .on("mousemove", this.mousemove)
      .on("mouseup", this.mouseup)
      .on("keydown", this.keydown);

    const chart = d3.select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    this.myChart = chart;

    const x = this.getX(this.props.xDomain,width)
    const y = this.getY(this.props.yDomain,height)

    chart.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))
      .append('text')
      .style('font-size', '18px')
      .attr('y', -35)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text(this.props.yTitle);

    chart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append('text')
      .style('font-size', '18px')
      .attr('transform', `translate(${width / 2}, 40)`)
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text(this.props.xTitle);

    chart.selectAll('.axis--x .tick')// xx轴背景线
      .append('line')
      .attr('stroke', 'rgba(0,0,0,0.5)')
      .attr('stroke-dasharray', '2,2')
      .attr('transform', `translate(${0},${(-1) * height})`)
      .attr('y2', height);

    chart.selectAll('.axis--y .tick')// xx轴背景线
      .append('line')
      .attr('stroke', 'rgba(0,0,0,0.5)')
      .attr('stroke-dasharray', '2,2')
      // .attr('transform', `translate(${0},${(-1) * height})`)
      .attr('x2', width);

    this.drawLine(this.state.data);
  }
  render() {
    return (
      <div className="line-chart--simple">
        <svg ref={(c) => { this.chartRef = c; }} />
      </div>
    );
  }
}
export default S2PathChart;
