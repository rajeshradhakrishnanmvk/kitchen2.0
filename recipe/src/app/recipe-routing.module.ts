import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



const recipeRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: 'recipes', loadChildren: './recipes/recipe-child-routing.module#RecipeChildRoutingModule' },
    //{ path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    //{ path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }


]
@NgModule({
    imports: [RouterModule.forRoot(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {

}