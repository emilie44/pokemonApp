import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }
    from '@angular/router';
import { AuthService } from './auth.service';
  
@Injectable()
export class AuthGuard implements CanActivate {

    //On fait appel à auth.service pour identifier si un utitlisateur est authentifié ou non.

    //Injection du authServie et du router ds le constructeur
    constructor(private authService: AuthService, private router: Router) { }
  
    //En param de canActivate :
    //    -> l'objet route de type ActivatedRouteSnapshot contient la future route qui sera appelée
    //    -> l'objet state de type RouterStateSnapshot contient le futur état du router de l'appli qui devra passer la vérification du guard.
     
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.checkLogin(url);
    }
  
    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) { return true; }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
  
        return false;
    }
}