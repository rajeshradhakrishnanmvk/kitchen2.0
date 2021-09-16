import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, SkipSelf } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('<url>',
            recipes).subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        // this.authService.user.pipe(take(1)).subscribe(user => {

        // });
        return this.http
            .get<Recipe[]>(
                '<url>'
            ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );

    }

    fetchRecipes1() {
        // this.authService.user.pipe(take(1)).subscribe(user => {

        // });
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http
                    .get<Recipe[]>(
                        '<url>',
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );

    }
}