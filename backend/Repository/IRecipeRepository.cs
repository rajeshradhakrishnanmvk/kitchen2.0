using System.Collections.Generic;
using backend.Models;

namespace backend.Repository
{
    public interface IRecipeRepository
    {
        UserRecipes CreateRecipe(UserRecipes userRecipe);
        bool DeleteRecipe(string userId, int recipeId);
        UserRecipes UpdateRecipe(int recipeId, string userId, Recipe recipe);
        List<Recipe> FindByUserId(string userId);
    }
}