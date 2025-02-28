import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroesService } from '../../../core/services/heroes.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Superman', power: 'Super fuerza' },
    { id: 2, name: 'Batman', power: 'Estrategia' }
  ];

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getHeroesArray',
      'deleteHero',
      'searchHeroes',
      'searchResults$'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    heroesServiceSpy.getHeroesArray.and.returnValue(mockHeroes);
    (heroesServiceSpy as any).searchResults$ = of([mockHeroes[1]]);

    await TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      providers: [
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the hero-list component', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on init', () => {
    expect(component.heroes.length).toBe(2);
  });

  it('should search heroes with debounceTime', fakeAsync(() => {
    component.onSearch({ target: { value: 'man' } } as any);
    tick(300);
    fixture.detectChanges();

    expect(heroesServiceSpy.searchHeroes).toHaveBeenCalledWith('man');
    expect(component.heroes.length).toBe(1);
  }));

  it('should delete hero', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDeleteHero(1);
    expect(heroesServiceSpy.deleteHero).toHaveBeenCalledWith(1);
  });
});
