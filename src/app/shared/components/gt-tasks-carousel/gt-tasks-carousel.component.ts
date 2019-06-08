import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from "@angular/core";
import { NguCarousel, NguCarouselConfig } from "@ngu/carousel";
import { CarouselInterval, Transfrom } from "@ngu/carousel/lib/ngu-carousel/ngu-carousel";

import { Task } from "../../models/task.model";

@Component({
	selector: 'gt-tasks-carousel',
	templateUrl: './gt-tasks-carousel.component.html',
	styleUrls: ['./gt-tasks-carousel.component.scss']
})
export class GTTasksCarouselComponent implements OnInit, AfterViewInit {

	@Input('tasks') tasks: Task[];
	@Input('grid') grid: any = { xs: 1, sm: 2, md: 3, lg: 4, all: 0 };
	@Input('loop') loop: boolean = true;
	@Input('touch') touch: boolean = true;
	@Input('velocity') velocity: number = 0.2;

	@ViewChild('myCarousel') myCarousel: NguCarousel<any>;
	
	carouselItems = [];

	carouselConfig: NguCarouselConfig = {
		grid: this.grid,
		load: 3,
		loop: this.loop,
		touch: this.touch,
		velocity: this.velocity
	};

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.carouselItems = this.tasks;
	}
	
	ngAfterViewInit(): void {
		this.cdr.detectChanges();
	}
}
