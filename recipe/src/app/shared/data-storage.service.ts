import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, SkipSelf } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    private serviceurl = environment.backendService;

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }


    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        const url = this. serviceurl + 'api/Recipes/';
        this.authService.user.pipe(take(1)).subscribe(user => {
            this.http
            .post(
                url + user.email,
                {
                    userId: user.email, 
                    recipes: recipes
                }
            ).subscribe(response => {
                console.log(response);
            });
        });


    }

    fetchRecipes() {
        const url = this. serviceurl + 'api/Recipes/';
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
            return this.http
            .get<Recipe[]>(
                url + user.email
            )
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