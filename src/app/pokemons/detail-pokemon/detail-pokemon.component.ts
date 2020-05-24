import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from '../model/Pokemon';
import { PokemonsService } from '../pokemons.service'

@Component({
  selector: 'detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.css']
})
export class DetailPokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private pokemonsService: PokemonsService) { }

// ngOnInit () doit récupérer un observable en s'y abonnant avc .subscribe
  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pokemonsService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
  }


  delete(pokemon:Pokemon): void {
    this.pokemonsService.deletePokemon(pokemon)
    .subscribe(_=> this.goBack()); // abonnement à l'observable du Service
}                                 // une fois le pkm supp redirection vers la liste de pkm moins celui supp

  goBack(): void {
    this.router.navigate(['/pokemon/all']);
  }

  goEdit(pokemon: Pokemon): void {
    let link = ['/pokemon/edit', pokemon.id];
    this.router.navigate(link);
  }

}
