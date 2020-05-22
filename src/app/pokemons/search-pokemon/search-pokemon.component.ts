import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
  
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
  
import { PokemonsService } from '../pokemons.service';
import { Pokemon } from '../model/pokemon';


@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
    
export class SearchPokemonComponent implements OnInit {

  // 'Subject' classe particulière qui permet de stocker les recherches successives de l'utilisateur sous la forme d'un Observable car
  // Subject hérite de la classe Observable
  private searchTerms = new Subject<string>();

  // pokemon$ = par convention, une variable est suivie du signe '$' lorsqu'elle est un Observable cad un flux.
  pokemons$: Observable<Pokemon[]>;
 
  constructor(
      private pokemonsService: PokemonsService,
      private router: Router) { }
 
  // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
  search(term: string): void {
      this.searchTerms.next(term);
  }
 
  // ngOnInit va permettre d'initialiser l'Observable pokemon$ :
    // SearchTerms en tant qu'Observable, permet de transformer le flux de termes de recherche de l'utilisateur en un flux de tableau de pkm.
    // Ce flux de tableau pkm correspond au résultat qui sera affecté à la propriété 'pokemons$'.
    // Afin de limiter le nbre de requetes au serveur on utilise les opérateurs suivant afin de faire moins d'appel au PokemonService.
  ngOnInit(): void {
      this.pokemons$ = this.searchTerms.pipe(
          // attendre 300ms de pause entre chaque requête
          debounceTime(300),
          // ignorer la recherche en cours si c'est la même que la précédente
          distinctUntilChanged(),
          // on retourne la liste des résultats correpsondant aux termes de la recherche
          switchMap((term: string) => this.pokemonsService.searchPokemons(term)),
      );
  }
 
  gotoDetail(pokemon: Pokemon): void {
      let link = ['/pokemon', pokemon.id];
      this.router.navigate(link);
  }

}
