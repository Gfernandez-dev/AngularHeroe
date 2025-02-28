import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { Observable } from 'rxjs';
import { Router,NavigationStart,NavigationEnd,NavigationCancel,NavigationError } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularHeroes';
  loading$: Observable<boolean>;

  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.isLoading$;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.setLoading(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.setLoading(false);
      }
    });
  }
}