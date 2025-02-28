import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { HeroesService } from '../../../core/services/heroes.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
      'getHeroById',
      'updateHero',
      'addHero'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    const mockParamMap: ParamMap = {
      get: (name: string) => (name === 'id' ? '1' : null),
      has: (name: string) => name === 'id',
      getAll: (name: string) => (name === 'id' ? ['1'] : []),
      keys: ['id']
    };

    const routeMock = {
      snapshot: { paramMap: mockParamMap }
    };

    heroesServiceSpy.getHeroById.and.returnValue({
      id: 1,
      name: 'Batman',
      power: 'Estrategia'
    });

    await TestBed.configureTestingModule({
      declarations: [
        HeroFormComponent // Declaramos el componente a testear
      ],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HeroFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroById if id param is present', () => {
    expect(heroesServiceSpy.getHeroById).toHaveBeenCalledWith(1);
    expect(component.heroForm.value.name).toBe('Batman');
  });

  it('should update hero if editingId is set', () => {
    component.heroForm.setValue({
      name: 'Batman2',
      power: 'Estrategia',
      description: ''
    });
    component.saveHero();
    expect(heroesServiceSpy.updateHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Batman2',
      power: 'Estrategia',
      description: ''
    });
  });
});
