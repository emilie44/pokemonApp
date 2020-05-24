import { Injectable } from '@angular/core';
// RxJS 6
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
  
@Injectable()
export class AuthService {
    // L'utilisateur courant est-il connecté ?
    // Par défaut l'utilisateur est déconnecté lorsque l'appli démarre?
    isLoggedIn: boolean = false; // L'utilisateur courant est-il connecté ?
    
    // Stocke l'url ddé par l'utilisateur avt authentification,
    // afin de le rediriger vers cette page après l'authentification.
    // Une méthode de connexion
    redirectUrl: string; 

    // Simule une connexion à une api externe en retournant un Observable
    // après un délai d'une seconde.
    login(name: string, password: string): Observable<boolean> {
        // Faites votre appel à un service d'authentification...
        let isLoggedIn = (name === 'pikachu' && password === 'pikachu');
  
        return of(true).pipe(
            delay(1000),
            tap(val => this.isLoggedIn = isLoggedIn)
        );
    }
  
    // Une méthode de déconnexion
    logout(): void {
        this.isLoggedIn = false;
    }
}