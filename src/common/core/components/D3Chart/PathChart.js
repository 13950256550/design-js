import React from 'react';
import * as d3 from 'd3';

class PathChart extends React.Component {
  componentDidMount() {
    // const containerWidth = this.chartRef.parentElement.offsetWidth;
    const containerWidth = this.props.width;
    const margin = { top: 50, right: 20, bottom: 130, left: 50 };
    const width = containerWidth - margin.left - margin.right - 300;
    const height = this.props.height - margin.top - margin.bottom;

    const z = d3.scaleOrdinal(d3.schemeCategory10);// 通用线条的颜色

    const chart = d3.select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear() // 定义x轴
      .domain(this.props.xDomain)
      .range([0, width]);

    const y = d3.scaleLinear() // 定义y轴
      .domain(this.props.yDomain)
      .range([height, 0]);

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
      // .curve(d3.curveMonotoneX)
      .curve(d3.curveLinear)
      .x((d) => { return x(d[0]); })
      .y((d) => { return y(d[1]); });

    const serie = chart.selectAll('.serie')
      .data(this.props.data)
      .enter().append('g')
      .attr('class', 'serie');

    serie.append('path')
      .style('stroke', 'rgba(255,0,0,0.5)')
      .style('stroke-width', 1.5)
      .attr('fill', 'none')
      .attr('d', line);

  }
  render() {
    return (
      <div className="line-chart--simple">
        <svg ref={(c) => { this.chartRef = c; }} />
      </div>
    );
  }
}
export default PathChart;
