import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './Components/Pokemon/Pokemon.component';
import { DetailComponent } from './Components/Pokemon/Detail/Detail.component';
import { ListComponent } from './Components/Pokemon/List/List.component';

const routes: Routes = [
  {
    path: 'pokemon',
    component: PokemonComponent,
    children: [
      { path: 'detalhe', component: DetailComponent },
      { path: 'detalhe/:id', component: DetailComponent },
      { path: 'lista', component: ListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
