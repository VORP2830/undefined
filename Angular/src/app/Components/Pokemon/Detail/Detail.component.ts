import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/Models/Pokemon';
import { PokemonService } from 'src/app/Service/Pokemon.service';

@Component({
  selector: 'app-Detail',
  templateUrl: './Detail.component.html',
  styleUrls: ['./Detail.component.css']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  pokemonId: number = 0;
  pokemon = {} as Pokemon;
  pokemonSave: string = 'post';

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService,
    private router: Router,
  ) { }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit() {
    this.validation();
    this.getPokemon();
  }

  public validation(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  public getPokemon(): void {
    const pokemonId = this.activatedRouter.snapshot.paramMap.get('id');
    console.log(pokemonId)
    if(pokemonId != null) {
      this.pokemonSave = 'put';
      this.pokemonService.getPokemonById(+pokemonId).subscribe(
        (result: Pokemon) => {
          this.pokemon = {...result};
          this.form.patchValue(this.pokemon);
        },
        (error: any) => {
          console.log(error)
        }
      ).add();
    }
  }

  public save() : void {
    if(this.form.valid) {
      if(this.pokemonSave == 'post'){
        this.pokemon = {... this.form.value}

        this.pokemonService.post (this.pokemon).subscribe({
          next: (eventoRetorno: any) => {
            this.router.navigate([`pokemon/lista`]);
          },
          error: (error: any) => {
            console.log(error);
            }
        }).add();
      } else{
        this.pokemon = {id: this.pokemon.id, ... this.form.value}
        this.pokemonService.put (this.pokemon).subscribe({
          next: () => {
            this.router.navigate([`pokemon/lista`]);
          },
          error: (error: any) => {
            console.log(error);
            }
        }).add();
      }
    }
  }

  public resetForm() :void {
    this.router.navigate([`pokemon/lista`])
  }

}
