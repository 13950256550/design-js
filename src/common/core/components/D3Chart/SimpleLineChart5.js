import React from 'react';
import * as d3 from 'd3';
import * as d3Tip from 'd3-tip';

class SimpleLineChart extends React.Component {
  componentDidMount(){
    this.draw();
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUpdate(){
  }

  componentDidUpdate(){
    //console.log('componentDidUpdate')
    //this.draw();
  }

  redarwLine = () =>{
    const chart = d3.select(this.chartRef)
  }

  circleMousedown = (d) =>{
    this.move = true;
    this.d = d;
    d[0] = Number(d[0])+0.1
    console.log(this.props.data)
  }

  circleMousemove = () =>{
    if(this.move && this.d){
      console.log(this.d)
    }
  }

  circleMouseup = () =>{
    if(this.move && this.d){
      this.move = false;
      this.d = null;
    }
  }

  draw = () => {
    // const containerWidth = this.chartRef.parentElement.offsetWidth;
    const containerWidth = this.props.width;
    const margin = { top: 50, right: 20, bottom: 130, left: 50 };
    const width = containerWidth - margin.left - margin.right - 300;
    const height = this.props.height - margin.top - margin.bottom;

    let maxValue = 0;
    let minValue = 1000000;

    this.props.data.forEach((arr) => {
      const value1 = d3.max(arr.data, (d) => { return parseFloat(d[1]); });
      const value2 = d3.min(arr.data, (d) => { return parseFloat(d[1]); });

      if (value1 > maxValue) {
        maxValue = value1;
      }

      if (value2 < minValue) {
        minValue = value2;
      }
    });

    maxValue += (maxValue - minValue) * 0.2;
    minValue -= (maxValue - minValue) * 0.2;

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
      .domain([minValue, maxValue])
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

    const drag = d3.drag()		// 创建一个拖拽行为
      .subject((d,i) => {		// 设置起点坐标
        return {x: d.cx ,y: d.cy } 	// 起点坐标为被拖动物体的圆心坐标
      })
      .on("start", () => {	// dragstart的监听器
        console.log("拖拽开始");
      })
      .on("end", () => {		// dragend的监听器
        console.log("拖拽结束");
      })
      .on("drag", function(d){		// drag的监听器
        console.log(x.invert(d3.event.x),y.invert(d3.event.y),)
        d3.select(this)		// 选择当前被拖拽的元素
        // 将d3.event.x赋值给被绑定的数据，再将cx属性设置为该值
          .attr("cx", d3.event.x )
          // 将d3.event.y赋值给被绑定的数据，再将cy属性设置为该值
          .attr("cy", d3.event.y );
      });

    serie.selectAll('.circle')
      .data((d => d.data))
      .enter().append('g')
      .append('circle')
      .attr('fill', '#000')
      .attr('class', 'linecircle')
      .attr('cx', line.x())
      .attr('cy', line.y())
      .attr('r', 3)
      //.call(drag)
      //.on("mousedown", this.circleMousedown)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    d3.select(window)
      .on("mousemove", this.circleMousemove)
      .on("mouseup", this.circleMouseup);

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

  handleClick = (e) => {
    const data = this.props.data;
    const line1 = data[0].data
    line1[0][0] = Number(line1[0][0])+0.2

    const chart = d3.select(this.chartRef)
    const serie = chart.selectAll('.serie')
    const path = serie.selectAll('path')

    //console.log(path[0].d)
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
