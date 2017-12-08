import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Array from 'd3-array';
import * as d3Random from 'd3-random';
import * as d3Format from 'd3-format';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';
import * as d3Interpolate from 'd3-interpolate';
/**
 * Generated class for the HistogramLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'histogram-layout',
  templateUrl: 'histogram-layout.html'
})
export class HistogramLayoutComponent implements OnInit {

  margin = { top: 10, right: 10, bottom: 20, left: 10 };
  width: number;
  height: number;
  constructor() {
  }
  ngOnInit(): void {
    const data = d3Array.range(1000).map(d3Random.randomBates(10))
    const formatCount = d3Format.format(',.0f');

    const container = document.querySelector('#histogramcontainer');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height = container.clientWidth - this.margin.top - this.margin.bottom;

    const svg = d3.select('#histogramcontainer').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xScale = d3Scale.scaleLinear().rangeRound([0, this.width]);
    const bins = d3Array.histogram().domain(xScale.domain()).thresholds(xScale.ticks(20))(data);
    const yScale = d3Scale.scaleLinear().domain([0, d3Array.max(bins, d => d.length)])
      .range([this.height, 0]);
    console.log(data)
    console.log(bins)
    const bar = chart.selectAll('.bar')
      .data(bins)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${xScale(d.x0)},${yScale(d.length)})`);

    bar.append('rect')
      .attr('x', 1)
      .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
      .attr('height', d => this.height - yScale(d.length));
    bar.append('text')
      .text(d => formatCount(d.length))
      .attr('x', xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
      .attr('text-anchor', 'end')
      .attr('fill', 'black');
    const line = d3Shape.line().x(d => xScale((d.x0 + d.x1) / 2)).y(d => yScale(d.length)).curve(d3Shape.curveBasis);
    chart.append('g')
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('d', line(bins));

    chart.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3Axis.axisBottom(xScale));
  }
}
