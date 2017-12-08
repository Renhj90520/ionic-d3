import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';

/**
 * Generated class for the PieChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pie-chart',
  templateUrl: 'pie-chart.html'
})
export class PieChartComponent implements OnInit {

  @Input() data;
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width: number;
  height: number;

  constructor() {
  }
  ngOnInit(): void {
    const container = document.querySelector('#piecontainer');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height = Math.floor(container.clientWidth * 9 / 16) - this.margin.top - this.margin.bottom;
    console.log('width:' + this.width + ' height:' + this.height);
    const svg = d3.select('#piecontainer')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    const outerRadius = this.height / 2;
    const arc = d3Shape.arc()
      .innerRadius(0)
      .outerRadius(outerRadius)
      .padAngle(0.02)
      .cornerRadius(5);
    const pie = d3Shape.pie();
    const colors = d3Scale.schemeCategory10;

    const arcs = chart.selectAll('g.arc')
      .data(pie(this.data.map(d => d.quantity)))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${outerRadius},${outerRadius})`);
    arcs.append('path').attr('fill', (d, i) => colors[i]).attr('d', arc);
    arcs.append('text').attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dx', -20)
      .attr('fill', 'white')
      .text(d => d.value);

    var legend = chart.append('g')
      .attr('class', 'legend')
      .selectAll('g.legend')
      .data(this.data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${0},${this.height - 100 + i * 20})`)

    legend.append('rect')
      .attr('x', this.width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', (d, i) => colors[i])

    legend.append('text')
      .attr('x', this.width - 24)
      .attr('y', 9.5)
      .attr('dy', '.32em')
      .attr('text-anchor', 'end')
      .text(d => d.company)
  }

}
