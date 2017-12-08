import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as d3Request from 'd3-request';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pieData = [
    { company: '小米', quantity: 608 },
    { company: '华为', quantity: 1020 },
    { company: '三星', quantity: 60 },
    { company: '苹果', quantity: 100 }
  ];
  forceData = {
    nodes: [
      { name: "Adam" },
      { name: "Bob" },
      { name: "Carrie" },
      { name: "Donovan" },
      { name: "Edward" },
      { name: "Felicity" },
      { name: "George" },
      { name: "Hannah" },
      { name: "Iris" },
      { name: "Jerry" }
    ],
    edges: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 1, target: 5 },
      { source: 2, target: 5 },
      { source: 2, target: 5 },
      { source: 3, target: 4 },
      { source: 5, target: 8 },
      { source: 5, target: 9 },
      { source: 6, target: 7 },
      { source: 7, target: 8 },
      { source: 8, target: 9 }
    ]
  };

  chordData = {
    continents: ['亚洲', '欧洲', '非洲', '美洲', '大洋洲'],
    population: [[9000, 870, 3000, 1000, 5200],
    [3400, 8000, 2300, 4922, 374],
    [2000, 2000, 7700, 4881, 1050],
    [3000, 8012, 5531, 500, 400],
    [3540, 4310, 1500, 1900, 300]]
  }

  treeData;
  packData = [
    { name: '中国', value: '', parentName: '' },
    { name: '浙江', value: '', parentName: '中国' },
    { name: '杭州', value: 1000, parentName: '浙江' },
    { name: '宁波', value: 2000, parentName: '浙江' },
    { name: '温州', value: 1500, parentName: '浙江' },
    { name: '绍兴', value: 900, parentName: '浙江' },
    { name: '广西', value: '', parentName: '中国' },
    { name: '桂林', value: '', parentName: '广西' },
    { name: '秀峰区', value: 900, parentName: '桂林' },
    { name: '叠彩区', value: 100, parentName: '桂林' },
    { name: '象山区', value: 200, parentName: '桂林' },
    { name: '七星区', value: 500, parentName: '桂林' },
    { name: '南宁', value: 2100, parentName: '广西' },
    { name: '柳州', value: 1300, parentName: '广西' },
    { name: '防城港', value: 1600, parentName: '广西' }
  ];

  stackData = [
    {
      month: '2015/1',
      apples: 3840,
      bananas: 1920,
      cherries: 960,
      dates: 400
    },
    {
      month: '2015/2',
      apples: 1600,
      bananas: 1440,
      cherries: 960,
      dates: 400
    },
    {
      month: '2015/3',
      apples: 640,
      bananas: 960,
      cherries: 640,
      dates: 400
    },
    {
      month: '2015/4',
      apples: 320,
      bananas: 480,
      cherries: 640,
      dates: 400
    }
  ];
  areaData;
  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.treeData = [
        { name: '中国', parentName: '' },
        { name: '浙江', parentName: '中国' },
        { name: '杭州', parentName: '浙江' },
        { name: '宁波', parentName: '浙江' },
        { name: '温州', parentName: '浙江' },
        { name: '绍兴', parentName: '浙江' },
        { name: '广西', parentName: '中国' },
        { name: '桂林', parentName: '广西' },
        { name: '秀峰区', parentName: '桂林' },
        { name: '叠彩区', parentName: '桂林' },
        { name: '象山区', parentName: '桂林' },
        { name: '七星区', parentName: '桂林' },
        { name: '南宁', parentName: '广西' },
        { name: '柳州', parentName: '广西' },
        { name: '防城港', parentName: '广西' }
      ];
    }, 3000);
    d3Request.json('assets/data/line.json', (err, data) => {
      if (err) throw new Error(err);
      this.areaData = data;
    })
  }

}
