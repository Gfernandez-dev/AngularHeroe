// src/app/core/services/heroes.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';

describe('HeroesService (Signals)', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a hero', () => {
    service.addHero({ name: 'Batman', power: 'Estrategia' });
    const heroes = service.getHeroesArray();
    expect(heroes.find(h => h.name === 'Batman')).toBeDefined();
  });

  it('should update a hero', () => {
    service.updateHero({ id: 1, name: 'Superman 2.0', power: 'Super fuerza' });
    const updated = service.getHeroById(1);
    expect(updated?.name).toBe('Superman 2.0');
  });

  it('should delete a hero', () => {
    service.deleteHero(1);
    const hero = service.getHeroById(1);
    expect(hero).toBeUndefined();
  });

  it('should search heroes', (done) => {
    service.addHero({ name: 'Spiderman', power: 'Sentido arácnido' });
    service.searchHeroes('man');
    service.searchResults$.subscribe(results => {
      expect(results.length).toBeGreaterThan(0);
      done();
    });
  });
});
