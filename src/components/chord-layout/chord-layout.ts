import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Chord from 'd3-chord';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3Color from 'd3-color';
/**
 * Generated class for the ChordLayoutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chord-layout',
  templateUrl: 'chord-layout.html'
})
export class ChordLayoutComponent implements OnInit {
  @Input() data;
  margin = { top: 20, right: 10, bottom: 20, left: 10 };
  width: number;
  height: number;
  constructor() {
  }
  ngOnInit(): void {
    const container = document.querySelector('#chordcontainer');
    this.width = container.clientWidth - this.margin.left - this.margin.right;
    this.height = container.clientWidth * 12 / 16 - this.margin.top - this.margin.bottom;
    const outerRadius = this.height / 2;
    const innerRadius = outerRadius - 10;
    const svg = d3.select('#chordcontainer')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom);

    const chart = svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)

    const chord = d3Chord.chord().padAngle(.05).sortSubgroups(d3Array.descending);
    const arc = d3Shape.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const ribbon = d3Chord.ribbon().radius(innerRadius);
    const colors = d3Scale.schemeCategory10;

    const region = chart.append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`)
      .datum(chord(this.data.population));

    var group = region.append('g')
      .attr('class', 'group')
      .selectAll('g')
      .data(d => d.groups)
      .enter()
      .append('g');
    group.append('path')
      .style('fill', (d, i) => colors[i])
      .attr('class', 'path')
      .style('stroke', (d, i) => d3Color.rgb(colors[i]).darker())
      .attr('d', arc);
    group.selectAll('.outertext')
      .data(chord(this.data.population).groups)
      .enter()
      .append('text')
      .attr('class', 'outertext')
      .each((d, i) => {
        d.angle = (d.startAngle + d.endAngle) / 2;
        d.name = this.data.continents[i];
      })
      .attr('transform', d => `rotate(${d.angle * 180 / Math.PI}) translate(0,${-1.0 * (outerRadius + 10)}) ${(d.angle > Math.PI * 3 / 4) && (d.angle < Math.PI * 5 / 4) ? 'rotate(180)' : ''}`)
      .attr('dy', '0.35em')
      .attr('dx', -20)
      .text(d => d.name)
    region.append('g')
      .attr('class', 'ribbon')
      .selectAll('path')
      .data(d => d)
      .enter()
      .append('path')
      .attr('d', ribbon)
      .attr('class', 'ribbon')
      .style('fill', (d, i) => colors[d.target.index])
      .style('fill-opacity', .5)
      .style('stroke', d => d3Color.rgb(colors[d.target.index]).darker());
  }
}
