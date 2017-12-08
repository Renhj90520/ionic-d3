import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3TimeFormat from 'd3-time-format';
/**
 * Generated class for the AreaChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'area-chart',
  templateUrl: 'area-chart.html'
})
export class AreaChartComponent implements OnInit {
  @Input() data;
  constructor() {
  }
  ngOnInit(): void {
    const container = document.querySelector('#areacontainer');
    const margin = { top: 10, right: 10, bottom: 40, left: 30 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientWidth - margin.top - margin.bottom;
    const parseTime = d3TimeFormat.timeParse('%Y/%m/%d');

    this.data.forEach(comp => {
      comp.values.forEach(d => {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });
    });
    const svg = d3.select('#areacontainer').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
    const xScale = d3Scale.scaleTime()
      .domain([
        d3Array.min(this.data, co => d3Array.min(co.values, d => d.date)),
        d3Array.max(this.data, co => d3Array.max(co.values, d => d.date))])
      .range([0, width]);
    const yScale = d3Scale.scaleLinear()
      .domain([
        d3Array.min(this.data, co => d3Array.min(co.values, d => d.close)),
        d3Array.max(this.data, co => d3Array.max(co.values, d => d.close))])
      .range([height, 0])
      .nice();

    const area = d3Shape.area()
      .x(d => xScale(d.date))
      .y0(yScale(yScale.domain()[0]))
      .y1(d => yScale(d.close))
      .curve(d3Shape.curveCatmullRom.alpha(0.5));
    const line = d3Shape.line().x(d => xScale(d.date)).y(d => yScale(d.close)).curve(d3Shape.curveCatmullRom.alpha(0.5));
    chart.selectAll('.area')
      .data(this.data)
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', d => area(d.values))
      .attr('fill', (d, i) => ["#ff9900", "#3369e8"][i])
      .attr('fill-opacity', 0.5);
    chart.selectAll('.line')
      .data(this.data)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .attr('fill', 'none')
      .attr('stroke', (d, i) => ["#ff9900", "#3369e8"][i])
      .attr('stroke-width', 2);
    const xAxis = d3Axis.axisBottom(xScale);
    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
    const yAxis = d3Axis.axisLeft(yScale);
    chart.append('g')
      .call(yAxis);

    d3.select('.x.axis').selectAll('text')
      .attr('transform', 'rotate(-45)')
      .attr('dx', -10)
      .attr('dy', 20)
  }


}
