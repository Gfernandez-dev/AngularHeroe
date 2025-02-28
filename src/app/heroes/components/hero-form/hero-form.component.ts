import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../../core/services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  standalone: false,
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  heroForm!: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      power: ['', Validators.required],
      description: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = +idParam;
      const hero = this.heroesService.getHeroById(this.editingId);
      if (hero) {
        this.heroForm.patchValue(hero);
      }
    }
  }

  saveHero() {
    if (this.heroForm.valid) {
      const { name, power, description } = this.heroForm.value;
      if (this.editingId) {
        this.heroesService.updateHero({ id: this.editingId, name, power, description });
      } else {
        this.heroesService.addHero({ name, power, description });
      }
      this.router.navigate(['/heroes']);
    }
  }
}
