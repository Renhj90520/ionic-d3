import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
/**
 * Generated class for the PackLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pack-layout',
  templateUrl: 'pack-layout.html'
})
export class PackLayoutComponent implements OnInit {
  @Input() data;
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width: number;
  height: number;
  constructor() {
  }

  ngOnInit(): void {
    const container = document.querySelector('#packcontainer');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height =  container.clientWidth- this.margin.top - this.margin.bottom;

    const svg = d3.select('#packcontainer').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const pack = d3Hierarchy.pack().size([this.width, this.height]).padding(3);
    const colors = d3Scale.scaleSequential(d3Scale.interpolateMagma).domain([-4, 4]);
    const stratify = d3Hierarchy.stratify().id(d => d.name).parentId(d => d.parentName);
    const root = stratify(this.data).sum(d => d.value).sort((a, b) => b.value - a.value);
    pack(root);
    const nodes = chart.selectAll('g')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);
    nodes.append('circle')
      .attr('r', d => d.r)
      .style('fill', d => colors(d.depth))
    const leaf = nodes.filter(d => !d.children);

    leaf.append('clipPath')
      .attr('id', d => 'clip-' + d.id)
      .append('use')
      .attr('xlink:href', d => '#clip' + d.id);

    leaf.append('text')
      .attr('clip-path', d => 'url(#clip-)' + d.id)
      .selectAll('tspan')
      .data(d => d.id.split(/(?=[A-Z][^A-Z])/g))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('fill', 'white')
      .attr('dx', -12)
      .attr('dy', 6)
      .text(d => d);
  }

}
