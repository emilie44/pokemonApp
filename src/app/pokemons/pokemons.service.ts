import { Injectable } from '@angular/core';
import { Pokemon } from './model/pokemon';
import { POKEMONS } from './mock-pokemons';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class PokemonsService {
  
  constructor(private http: HttpClient) { } ;

  /*** pokemonUrl :
   *** => point d'accès de l'API à un seul endroit ds le service,
   *** si jsms ce chemin devait changer, on pourra le modifier simplement
   *** Ce point de terminaison est généré automatiquement par l'API grace au service inMemorydbService.*/
  
  private pokemonsUrl = 'api/pokemons';

  /**** Méthode log :
   ***  => centralise la gestion des logs du Service.*/

  private log(log: string) {
    console.info(log);
  }

  /*** Méthode handleError :
  ***  =>  le param 'operation' = nom de la méthode qui a causé l'erreur. Par défaut ce param vaut 'operation'.
  ***  =>  Le param 'result' est une donnée facultative à renvoyer comme résultat de l'Observable.
  ***  =>  L'instruction 'return of (result as T)' permet de laisser notre appli fonctionner en renvoyant 
  ***      un resultat adapté à la methode qui a levé l'erreur.
  ***      Chq methode du service renvoie un Observable dont le résultat à un type différent.
  ***      Par ex un tab de pokm pour la methode getPokemons(), un objet pkm unique pour getPokemon().
  ***      HandleError prend en param le type <T> (T de Typscript) afin de retourner 
  ***      une valeur sûre pour chaque méthode qui a levé l'erreur. C'est à dire le type attendu par cette méthode.
  ***      l'appli peut continuer à fonctionner même si une erreur est levée.
  */
  /*** L'opérateur 'of' :
   *** => permet de transformer les données passées en param en un Observable.
   *** Grace à 'of' nous pouvons retourner le result en tant qu'Observable et donc
   *** ne pas interrompre le déroulement de tous les processus dans l'application.
   */


  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }


  /*** searchPokemon() => création d'un champ de recherche 
   *** pd en param un term qui correspond aux termes rentrés par l'utilisateur
   *** methode qui renvoie un Observable contenant un flux de pkm en résulta
   *** Boucle if qui vérifie si l'utilisateur n'a pas rentré un terme vide
   *** ds ce cas => renvoi d'un tab vide  sous la forme d'un Observable via l'opérateur 'of'
   *** Dans le 'return' => particularité de l'url qui renvoie tous les pkms dont la propriété
   *** nom contient ou est égal aux termes de la recherche. 
   */
  searchPokemons(term: string): Observable<Pokemon[]>{
    if(!term.trim()){
      return of ([]);
    }
    
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(_=> this.log(`found pokemons matching "${term}"`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons', []))
    );
  
  }



    /***************************************************************************************
    *** getPokemons() retourne tous les pokémons => mot clé 'Observable' ds la signature.***
    *** getPokemons renvoie un Observable qui renverra un tableau de pokemon****************
    *** La methode http.get(), retourne un Observable qui s'occupe d'envoyer une requête Get sur la route api/pokemons.
    *** 2 opérations sont effectuées sur l'Observable :
    ***   tap permet d'intéragir sur le déroulement des évènements générés par l'Observable en exécutant 
          une action quelconque ex : debug ou archivage ici message console pour signaler que la méthode a bien été appelée.
    ***   catchError permet d'intercepter les erreurs éventuelles
    ***********************************************************************************************/
   getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log('fetched pokemons')),
      catchError(this.handleError('getPokemons', []))
    );
  }
      
    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable <Pokemon> {
     const url = `${this.pokemonsUrl}/${id}`; // syntaxe ES6
  
     return this.http.get<Pokemon>(url).pipe(
       tap(_=>this.log(`fetched pokemon id=${id}`)),
       catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
     );
     
    }
    
      /*** updatePokemon requête de type 'PUT':
   *** => L'en tête de la requête : on déclare une en-tête pour signaler que le format du corps de la requête sera au format Json.
   *** On ajoute ensuite cette en-tête à la requête http (lgn 97)
   *** Sur cette même ligne on définit le point d'accès à l'API : les modifs s'applique 
   *** sur un pkm précis, il faut donc renseigner l'url de l'API et le pkm sur 
   *** sur lequel on veut effectuer la modif.
   *** Sur les lignes suivantes on effectue le traitement de la requête : 
   *** avc les opérateurs tap et catchError
   */

  updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
    return this.http.put(this.pokemonsUrl, pokemon, httpOptions).pipe(
      tap(_=> this.log( `updated pokemon id=${pokemon.id}`)),
      catchError(this.handleError<any>(`updatedPokemon`))
      );
  }

// deletePokemon() :
// declaration de 2 const : 
      // const url pour l'api qui sera appelée
      // const httpOption pr decalrer les headers qui seront passés ds la requête à effectuer
// 'return' => requete avec la methode delete  

      deletePokemon(pokemon: Pokemon): Observable<Pokemon>{
    const url = `${this.pokemonsUrl}/${pokemon.id}`;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json'})
      };
      return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_=> this.log(`deleted pokemon id=${pokemon.id}`)),
        catchError(this.handleError<any>(`deletePokemon`))
      );
  }

    getPokemonTypes(): string[] {
      return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol'];
      
    }
}