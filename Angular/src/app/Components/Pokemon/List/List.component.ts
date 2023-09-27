import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/Models/Pokemon';
import { PokemonService } from 'src/app/Service/Pokemon.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-List',
  templateUrl: './List.component.html',
  styleUrls: ['./List.component.css']
})
export class ListComponent implements OnInit {
  modalRef?: BsModalRef;
  pokemonId: number = 0
  pokemons: Pokemon[] = []

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getPokemon();
  }

  public getPokemon(): void {
    this.pokemonService.getAll().subscribe({
      next: (result: any) => {
        this.pokemons = result;
      },
      error: (error: any) => {
        console.log(error)
      }
    }).add();
  }

  public detailPokemon(id: number): void {
    this.router.navigate([`pokemon/detalhe/${id}`]);
  }

  openModal(event: any, template: TemplateRef<any>, pokemonId: number): void {
    event.stopPropagation();
    this.pokemonId = pokemonId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  decline(): void {
    this.modalRef?.hide();
  }

  confirm() {
    this.modalRef?.hide();
    console.log(this.pokemonId)
    this.pokemonService.delete(this.pokemonId).subscribe({
      next: (result: any) => {
          this.getPokemon();
      },
      error: (error: any) => {
        console.log(error);
      }
    }).add();
  }

}
