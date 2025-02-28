// src/app/core/services/heroes.service.ts
import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Hero } from '../models/hero.model';
import { BehaviorSubject, debounceTime, switchMap, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  /**
   * Almacenamos los héroes en un WritableSignal<Map<number, Hero>>
   * para acceso O(1) y reactividad interna sin suscripciones manuales.
   */
  private heroesSignal: WritableSignal<Map<number, Hero>> = signal(
    new Map<number, Hero>([
      [1, { id: 1, name: 'Superman', power: 'Super fuerza', description: 'Vuela y es muy fuerte' }]
    ])
  );

  /**
   * searchTerm con BehaviorSubject + debounceTime
   * para búsqueda por nombre.
   */
  private searchTermSubject = new BehaviorSubject<string>('');
  searchResults$ = this.searchTermSubject.pipe(
    debounceTime(1000),
    switchMap(term => {
      const heroesArray = [...this.heroesSignal().values()];
      const filtered = heroesArray.filter(h => h.name.toLowerCase().includes(term.toLowerCase()));
      return of(filtered);
    })
  );

  constructor() {}

  /** Retorna todos los héroes como array */
  getHeroesArray(): Hero[] {
    return [...this.heroesSignal().values()];
  }

  /** Buscar héroes por string */
  searchHeroes(term: string): void {
    this.searchTermSubject.next(term);
  }

  /** Obtiene héroe por ID */
  getHeroById(id: number): Hero | undefined {
    return this.heroesSignal().get(id);
  }

  /** Agrega un héroe */
  addHero(hero: Omit<Hero, 'id'>): void {
    const heroesMap = new Map(this.heroesSignal());
    const newId = heroesMap.size > 0 ? Math.max(...heroesMap.keys()) + 1 : 1;
    heroesMap.set(newId, { id: newId, ...hero });
    this.heroesSignal.set(heroesMap);
  }

  /** Actualiza un héroe existente */
  updateHero(updated: Hero): void {
    const heroesMap = new Map(this.heroesSignal());
    if (heroesMap.has(updated.id)) {
      heroesMap.set(updated.id, updated);
      this.heroesSignal.set(heroesMap);
    }
  }

  /** Elimina un héroe */
  deleteHero(id: number): void {
    const heroesMap = new Map(this.heroesSignal());
    heroesMap.delete(id);
    this.heroesSignal.set(heroesMap);
  }
}
