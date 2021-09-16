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

    //curl -X POST "http://localhost:8081/api/Recipes/r%40gmail.com" -H  "accept: */*" -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJAZ21haWwuY29tIiwianRpIjoiNzdjMjg0ZDktMGM3Yi00MWE1LTg0NDMtODY0ZWRlNTQwM2IzIiwiZXhwIjoxNjMxNzkwNjQyLCJpc3MiOiJBdXRoU2VydmVyIiwiYXVkIjoicmVjaXBlYXBpIn0.U1JAYshR5vfnYmnWxj7uCWYLrDNNnGXtTuv8GOAH1Q8" -H  "Content-Type: application/json" -d "{\"id\":0,\"name\":\"Test\",\"description\":\"Test Recipe\",\"imagePath\":\"//image//test\",\"ingredient\":[{\"id\":0,\"name\":\"Cheese\",\"amount\":10,\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}],\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}"
    //curl -X POST "http://localhost:8081/api/Recipes/r%40gmail.com" -H  "accept: */*" -H  "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InJAZ21haWwuY29tIiwianRpIjoiYjM2MmZhNTItMmZhZi00M2RkLTg0NjMtNmUzZmM2M2JkMTU3IiwiZXhwIjoxNjMxNzk2MjMxLCJpc3MiOiJBdXRoU2VydmVyIiwiYXVkIjoicmVjaXBlYXBpIn0.0PK5gh7mx5ysfv6xYJEvMUiIwT5DIziFeL1Q0WYfwzw" -H  "Content-Type: application/json" -d "{\"userId\":\"r@gmail.com\",\"recipes\":[{\"id\":0,\"name\":\"Test\",\"description\":\"Test Recipe\",\"imagePath\":\"//image//test\",\"ingredient\":[{\"id\":0,\"name\":\"Cheese\",\"amount\":10,\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}],\"createdBy\":\"Rajesh\",\"creationDate\":\"2021-09-16T05:06:10.078Z\"}]}"
    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.authService.user.pipe(take(1)).subscribe(user => {
            this.http
            .post(
                'http://localhost:8081/api/Recipes/' + user.email,
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
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
            return this.http
            .get<Recipe[]>(
                'http://localhost:8081/api/Recipes/' + user.email
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