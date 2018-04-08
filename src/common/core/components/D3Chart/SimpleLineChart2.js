import React from 'react';
import * as d3 from 'd3';

const data = [
  { time: '00:00', pm25: 75 },
  { time: '01:00', pm25: 66 },
  { time: '02:00', pm25: 43 },
  { time: '03:00', pm25: 32 },
  { time: '04:00', pm25: 20 },
  { time: '05:00', pm25: 18 },
  { time: '06:00', pm25: 16 },
  { time: '07:00', pm25: 33 },
  { time: '08:00', pm25: 53 },
  { time: '09:00', pm25: 66 },
  { time: '10:00', pm25: 55 },
  { time: '11:00', pm25: 67 },
  { time: '12:00', pm25: 99 },
  { time: '13:00', pm25: 138 },
  { time: '14:00', pm25: 110 },
  { time: '15:00', pm25: 99 },
  { time: '16:00', pm25: 119 },
  { time: '17:00', pm25: 125 },
  { time: '18:00', pm25: 173 },
  { time: '19:00', pm25: 168 },
  { time: '20:00', pm25: 162 },
  { time: '21:00', pm25: 143 },
  { time: '22:00', pm25: 132 },
  { time: '23:00', pm25: 87 },
];

class SimpleLineChart2 extends React.Component {
  componentDidMount() {
    const containerWidth = this.chartRef.parentElement.offsetWidth;
    const margin = { top: 30, right: 20, bottom: 30, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const timeParse = d3.timeParse('%H:%M');

    const key = Object.keys(data[0])[1];
    const serieArr = data.map((d) => {
      return {
        key,
        time: timeParse(d.time),
        value: d[key],
      };
    });

    const maxValue = d3.max(serieArr, (d) => { return d.value; });
    const stepValue = 25; // 用于生成背景柱

    const x = d3.scaleTime() // 定义x轴
      .domain([serieArr[0].time, serieArr[data.length - 1].time])
      .range([0, width]);

    const y = d3.scaleLinear() // 定义y轴
      .domain([0, maxValue])
      .range([height, 0]);

    const line = d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => { return x(d.time); })
      .y((d) => { return y(d.value); });

    const chart = d3.select(this.chartRef)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom + 40)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    chart.selectAll('.serie')
      .data([serieArr])
      .enter().append('g')
      .attr('class', 'serie')
      .append('path')
      .style('stroke', '#000')
      .style('stroke-width', 1)
      .attr('fill', 'none')
      .attr('d', line);


    chart.append('g')// 设置y轴
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).tickValues(d3.range(0, maxValue, stepValue)))
      .append('text')
      // .attr('transform', 'rotate(-90)')
      // .attr('y', 0 - margin.left)
      // .attr('x', 0 - (height / 2))
      .attr('y', -16)
      .attr('dy', '.71em')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text('AQI 值');

    chart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(24).tickFormat(d3.timeFormat('%H:%M')))
      .append('text')// 生成x轴
      .attr('transform', 'translate(500, 40)')
      .style('text-anchor', 'middle')
      .style('fill', '#000')
      .text('日期');

    chart.selectAll('.axis--x .tick')// xx轴背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(0,0,0,0.5)')
      .attr('stroke-dasharray', '2,2')
      .attr('shape-rendering', 'crispEdges')
      .attr('transform', `translate(${0},${(-1) * height})`)
      .attr('y2', height);

    chart.selectAll('.axis--y .tick')// xx轴背景线
      .append('line')
      .attr('class', 'bg-line')
      .attr('stroke', 'rgba(0,0,0,0.5)')
      .attr('stroke-dasharray', '2,2')
      .attr('shape-rendering', 'crispEdges')
      // .attr('transform', `translate(${0},${(-1) * height})`)
      .attr('x2', width);
  }
  render() {
    return (
      <div className="line-chart--simple">
        <svg ref={(c) => { this.chartRef = c; }} />
      </div>
    );
  }
}

export default SimpleLineChart2;
