// heroes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

import { ReactiveFormsModule } from '@angular/forms';
// Material
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para paginación

@NgModule({
  declarations: [
    HeroListComponent,
    HeroFormComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class HeroesModule {}
