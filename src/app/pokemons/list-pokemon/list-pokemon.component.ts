import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { Pokemon } from '../model/pokemon';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service'
import { from } from 'rxjs';

@Component({
  selector: 'list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.css']
})

export class ListPokemonComponent implements OnInit{
    
    pokemons: Pokemon[] = null;

    constructor(private router:Router, 
                private pokemonsService: PokemonsService){ };
  
ngOnInit(){
  this.getPokemons();
}

//pokemonsService renvoie des Observables
// le composant listPokm doit s'abonner à l'observable renvoyez par la méthode getPkms
// il faut appeler la méthode .subscribe, récup la liste des pkms renvoyez par l'observable du service
// avec une fonction fléchée on attribue à la propriété pkms du composant, le résultat de l'observable

getPokemons(): void {
  this.pokemonsService.getPokemons()
    .subscribe(pokemons => this.pokemons = pokemons);
}

selectPokemon (pokemon: Pokemon) {
  console.log(`Vous avez cliqué sur ${pokemon.name}`);
  let link = ['/pokemon', pokemon.id];
  this.router.navigate(link);
}


}
