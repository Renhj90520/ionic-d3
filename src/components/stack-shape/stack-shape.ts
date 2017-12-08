import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
/**
 * Generated class for the StackShapeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stack-shape',
  templateUrl: 'stack-shape.html'
})
export class StackShapeComponent implements OnInit {
  @Input() data;
  constructor() {
  }
  ngOnInit(): void {
    const margin = { top: 10, right: 10, bottom: 20, left: 40 };
    const container = document.querySelector('#stackcontainer');
    const width = container.clientWidth - margin.left - margin.right;
    const height = container.clientWidth * 9 / 16 - margin.top - margin.bottom;
    const keys = ["apples", "bananas", "cherries", "dates"];

    const svg = d3.select('#stackcontainer')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3Scale.scaleBand().domain(this.data.map(d => d.month)).range([0, width])
      .padding(0.1);
    const series = d3Shape.stack().keys(keys)(this.data);
    console.log(series);
    const yScale = d3Scale.scaleLinear().domain([0, d3Array.max(series, s => d3Array.max(s, d => d[1]))])
      .range([height, 0]).nice();
    const colors = d3Scale.schemeCategory10;
    chart.append('g')
      .selectAll('g')
      .data(series)
      .enter()
      .append('g')
      .attr('fill', d => colors[d.index])
      .selectAll('rect')
      .data(d => {
        console.log(d)
        return d
      })
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.data.month))
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => yScale(d[0]) - yScale(d[1]));
    const xAxis = d3Axis.axisBottom(xScale);
    const yAxis = d3Axis.axisLeft(yScale);
    chart.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);
    chart.append('g')
      .call(yAxis);

    const legend = chart.append('g')
      .attr('class', 'legend')
      .selectAll('g.legend')
      .data(keys)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${10 + i * 20})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', (d, i) => colors[i])

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 5)
      .attr('dy', '.75em')
      .attr('text-anchor', 'end')
      .text(d => d);

  }
} 2
