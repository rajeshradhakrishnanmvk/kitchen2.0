using System.Collections.Generic;
using backend.Models;

namespace backend.Service
{
    public interface IRecipeService
    {
        UserRecipes CreateRecipe(UserRecipes userRecipe);
        UserRecipes AddRecipe(string userId, Recipe recipe);
        bool DeleteRecipe(string userId, int recipeId);
        UserRecipes UpdateRecipe(int recipeId, string userId, Recipe recipe);
        List<Recipe> GetAllRecipes(string userId);
        Recipe GetRecipe(string userId, int recipeId);
    }
}