import {
  Component,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewChecked,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatDialog } from '@angular/material';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { SharedService } from './core/services/shared.service';
import { SideNavService } from './core/services/side-nav.service';
import { TaskRoutingNames } from './pages/task/task-routing-names';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('sidenav') private sidenav: MatSidenav;

  taskFormLink = `/${TaskRoutingNames.TASKS}/${TaskRoutingNames.TASK_FORM}`;
  tasksLink = `/${TaskRoutingNames.TASKS}`;

  itensMenuViewExtended: boolean = true;
  itensMenuViewExtendedAlways: boolean = true;
  version: string;
  userIsLoggedIn$ = new Observable<boolean>(null);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private sideNavService: SideNavService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {}

  ngOnInit(): void {
    this.userIsLoggedIn$ = this.sharedService.userIsLoggedIn$;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      .pipe(switchMap((route) => route.data))
      .subscribe((event) => this.titleService.setTitle(event.title));

    this.mobileQuery = this.media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewChecked(): void {
    this.sideNavService.setSidenav(this.sidenav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  setMenuTitle(title: string) {
    this.sharedService.setTitleMenu(title);

    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }
}
