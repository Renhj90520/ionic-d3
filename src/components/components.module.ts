import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart';
import { ForceLayoutComponent } from './force-layout/force-layout';
import { ChordLayoutComponent } from './chord-layout/chord-layout';
import { TreeLayoutComponent } from './tree-layout/tree-layout';
import { PackLayoutComponent } from './pack-layout/pack-layout';
import { HistogramLayoutComponent } from './histogram-layout/histogram-layout';
import { StackShapeComponent } from './stack-shape/stack-shape';
import { AreaChartComponent } from './area-chart/area-chart';
@NgModule({
	declarations: [PieChartComponent,
		ForceLayoutComponent,
    ChordLayoutComponent,
    TreeLayoutComponent,
    PackLayoutComponent,
    HistogramLayoutComponent,
    StackShapeComponent,
    AreaChartComponent,],
	imports: [],
	exports: [PieChartComponent,
		ForceLayoutComponent,
    ChordLayoutComponent,
    TreeLayoutComponent,
    PackLayoutComponent,
    HistogramLayoutComponent,
    StackShapeComponent,
    AreaChartComponent,]
})
export class ComponentsModule { }
