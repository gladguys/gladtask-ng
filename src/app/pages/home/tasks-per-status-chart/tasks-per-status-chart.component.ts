import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { MediaMatcher } from "@angular/cdk/layout";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'tasks-per-status-chart',
  templateUrl: './tasks-per-status-chart.component.html',
  styleUrls: ['./tasks-per-status-chart.component.css']
})
export class TasksPerStatusChartComponent implements  AfterViewInit, OnDestroy {

	private chart;

	constructor(
		private media: MediaMatcher,
		private zone: NgZone) {}

	ngAfterViewInit(): void {
		this.zone.runOutsideAngular(() => {
			let chart = am4core.create("chartdiv", am4charts.PieChart);
			chart.hiddenState.properties.opacity = 0;

			chart.data = [
				{
					status: "Novo",
					qtd: 3
				},
				{
					status: "Em andamento",
					qtd: 1
				},
				{
					status: "Em espera",
					qtd: 7
				},
				{
					status: "Aguardando merge",
					qtd: 3
				}
			];
			chart.radius = am4core.percent(70);
			chart.innerRadius = am4core.percent(40);
			chart.startAngle = 180;
			chart.endAngle = 360;

			let series = chart.series.push(new am4charts.PieSeries());
			series.dataFields.value = "qtd";
			series.dataFields.category = "status";

			series.slices.template.cornerRadius = 10;
			series.slices.template.innerCornerRadius = 7;
			series.slices.template.draggable = true;
			series.slices.template.inert = true;
			series.alignLabels = false;

			series.hiddenState.properties.startAngle = 90;
			series.hiddenState.properties.endAngle = 90;

			chart.responsive.enabled = true;
			chart.legend = new am4charts.Legend();
			this.chart = chart;
		});
	}

	ngOnDestroy(): void {
		this.zone.runOutsideAngular(() => {
			if (this.chart) {
				this.chart.dispose();
			}
		});
	}
}
