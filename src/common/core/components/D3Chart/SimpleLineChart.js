import React from 'react';
import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';

class SimpleLineChart extends React.Component {
  componentDidMount(){
    this.draw();
  }

  draw = () => {
    // const containerWidth = this.chartRef.parentElement.offsetWidth;
    const containerWidth = this.props.width;
    const margin = { top: 50, right: 20, bottom: 130, left: 50 };
    const width = containerWidth - margin.left - margin.right - 300;
    const height = this.props.height - margin.top - margin.bottom;

    let xMaxValue = -1000000;
    let xMinValue = 1000000;
    let yMaxValue = -1000000;
    let yMinValue = 1000000;

    if(this.props.data){
      this.props.data.forEach((arr) => {
        const xValue1 = d3.max(arr.data, (d) => { return parseFloat(d[0]); });
        const xValue2 = d3.min(arr.data, (d) => { return parseFloat(d[0]); });

        if (xValue1 > xMaxValue) {
          xMaxValue = xValue1;
        }

        if (xValue2 < xMinValue) {
          xMinValue = xValue2;
        }

        const yValue1 = d3.max(arr.data, (d) => { return parseFloat(d[1]); });
        const yValue2 = d3.min(arr.data, (d) => { return parseFloat(d[1]); });

        if (yValue1 > yMaxValue) {
          yMaxValue = yValue1;
        }

        if (yValue2 < yMinValue) {
          yMinValue = yValue2;
        }
      });
    }else{
      xMaxValue = 10;
      xMinValue = 0;
      yMaxValue = 10;
      yMinValue = 0;
    }

    xMaxValue += (xMaxValue - xMinValue) * 0.1;
    xMinValue -= (xMaxValue - xMinValue) * 0.1;

    yMaxValue += (yMaxValue - yMinValue) * 0.1;
    yMinValue -= (yMaxValue - yMinValue) * 0.1;

    const z = d3.scaleOrdinal(d3.schemeCategory10);// 通用线条的颜色

    const chart = d3.select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    let x;
    if(this.props.xDomain){
      x = d3.scaleLinear() // 定义x轴
        .domain(this.props.xDomain)
        .range([0, width]);
    }else{
      x = d3.scaleLinear() // 定义x轴
        .domain([xMinValue,xMaxValue])
        .range([0, width]);
    }

    let y
    if(this.props.yDomain){
      y = d3.scaleLinear() // 定义y轴
        .domain(this.props.yDomain)
        .range([height, 0]);
    }else{
      y = d3.scaleLinear() // 定义y轴
        .domain([yMinValue,yMaxValue])
        .range([height, 0]);
    }

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

    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => { return x(d[0]); })
      .y((d) => { return y(d[1]); });

    const serie = chart.selectAll('.serie')
      .data(this.props.data)
      .enter().append('g')
      .attr('class', 'serie');

    serie.append('path')
      .style('stroke', ((d, i) => z(i)))
      .style('stroke-width', 1)
      .attr('fill', 'none')
      .attr('d', (d => line(d.data)));

    const tip = d3Tip() // 设置tip
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html((d) => {
        return `<strong>${d[1]}</strong>`;
      });

    chart.call(tip);


    serie.selectAll('.circle')
      .data((d => d.data))
      .enter().append('g')
      .append('circle')
      .attr('fill', '#000')
      .attr('class', 'linecircle')
      .attr('cx', line.x())
      .attr('cy', line.y())
      .attr('r', 3)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    const markStep = 80;

    const gMark = chart.selectAll('.gMark')
      .data(this.props.data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return `translate(${margin.left + 100 + (i * markStep)},-35)`;
      });

    gMark.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', (d, i) => { return z(i); });

    gMark.append('text')
      .attr('dx', 15)
      .attr('dy', '.5em')
      .attr('fill', 'black')
      .text((d) => { return d.key; });
  }

  render() {
    return (
      <div className="line-chart--simple">
        <svg ref={(c) => { this.chartRef = c; }} />
      </div>
    );
  }
}
export default SimpleLineChart;
