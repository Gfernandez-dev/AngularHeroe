import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Hero } from '../../../core/models/hero.model';
import { HeroesService } from '../../../core/services/heroes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  standalone: false,
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'power', 'description', 'actions'];
  heroes: Hero[] = [];
  private searchSub?: Subscription;

  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService, private router: Router) {}

  ngOnInit(): void {
    this.heroes = this.heroesService.getHeroesArray();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const term = input.value ?? '';
    this.heroesService.searchHeroes(term);

    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
    this.searchSub = this.heroesService.searchResults$.subscribe(filtered => {
      this.heroes = filtered;
      this.pageIndex = 0;
    });
  }

  onAddHero() {
    this.router.navigate(['/heroes/create']);
  }

  onEditHero(id: number) {
    this.router.navigate(['/heroes/edit', id]);
  }

  onDeleteHero(id: number) {
    if (confirm('¿Borrar héroe?')) {
      this.heroesService.deleteHero(id);
      this.heroes = this.heroesService.getHeroesArray();
    }
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get pagedHeroes(): Hero[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.heroes.slice(startIndex, startIndex + this.pageSize);
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }
}
