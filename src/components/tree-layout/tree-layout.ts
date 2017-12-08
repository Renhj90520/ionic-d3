import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Shape from 'd3-shape';
/**
 * Generated class for the TreeLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tree-layout',
  templateUrl: 'tree-layout.html'
})
export class TreeLayoutComponent implements OnInit {
  @Input() data;
  margin = { top: 10, right: 10, bottom: 10, left: 10 };
  width: number;
  height: number;
  constructor() {
  }
  ngOnInit(): void {
    const container = document.querySelector('#treecontainer');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height =  container.clientWidth * 16 / 9 - this.margin.top - this.margin.bottom;

    const svg = d3.select('#treecontainer').append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);
    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const tree = d3Hierarchy.tree().size([this.width, this.height - 20]);

    const stratify = d3Hierarchy.stratify().id(d => d.name).parentId(d => d.parentName);
    const root = stratify(this.data);
    const links = chart.selectAll('.treelink')
      .data(tree(root).links())
      .enter()
      .append('path')
      .attr('class', 'treelink')
      .attr('fill', 'none')
      .attr('stroke', 'darkgrey')
      .attr('d', d3Shape.linkHorizontal().x(d => d.x).y(d => d.y));

    const nodes = chart.selectAll('.treenode')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'treenode')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
      .attr('r', 2.5);

    nodes.append('text')
      .attr('y', d => d.children ? -15 : 15)
      .style('text-anchor', 'middle')
      .text(d => d.id)
  }
}
