import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Force from 'd3-force';
import * as d3Drag from 'd3-drag';
/**
 * Generated class for the ForceLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'force-layout',
  templateUrl: 'force-layout.html'
})
export class ForceLayoutComponent implements OnInit {
  @Input() data;
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width: number;
  height: number;
  constructor() { }
  ngOnInit(): void {
    const container = document.querySelector('#forcecontainer');

    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height = container.clientWidth * 9 / 16 - this.margin.top - this.margin.bottom;

    const svg = d3.select('#forcecontainer')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const force = d3Force.forceSimulation()
      .force('charge', d3Force.forceManyBody().strength(-100).distanceMin(50).distanceMax(200))
      .force('link', d3Force.forceLink().id(d => d.index))
      .force('center', d3Force.forceCenter(this.width / 2, this.height / 2))
      .force('x', d3Force.forceX(0.001))
      .force('y', d3Force.forceY(0.001));
    force.nodes(this.data.nodes).force('link').links(this.data.edges);

    const links = chart.selectAll('.link')
      .data(this.data.edges)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('class', 'link');

    const nodes = chart.selectAll('.node')
      .data(this.data.nodes)
      .enter()
      .append('g')
      .style('cursor', 'default')
      .attr('class', 'node')
      .call(d3Drag.drag().on('start', d => {
        if (!d3.event.active) {
          force.alphaTarget(0.5).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      }).on('drag', d => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }).on('end', d => {
        if (!d3.event.active) force.alphaTarget(0.5);
        d.fx = null;
        d.fy = null;
      }))
    nodes.append('circle')
      .attr('r', 10);

    force.on('tick', () => {
      links.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    })
  }
}
