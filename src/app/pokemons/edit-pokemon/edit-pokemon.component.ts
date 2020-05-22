import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from '../model/pokemon';
import { PokemonsService } from '../pokemons.service';


@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {

  pokemon: Pokemon = null;

  constructor( private route: ActivatedRoute,
    private pokemonsService: PokemonsService) { }

// ngOnInit () doit récupérer un observable en s'y abonnant avc .subscribe
    ngOnInit(): void {
      let id = +this.route.snapshot.params['id'];
      this.pokemonsService.getPokemon(id)
      .subscribe(pokemon => this.pokemon = pokemon);
    }

}

