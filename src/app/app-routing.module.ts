import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

// routes : attention l'ordre de déclaration des routes est TRES IMPORTANT
// les routes les plus précises doivent être déclarées en premier
// les routes plus générales doivent être déclarées à la fin
const appRoutes: Routes = [
    { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent}
];
  
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }