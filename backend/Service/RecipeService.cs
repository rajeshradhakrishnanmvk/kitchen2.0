
using System.Collections.Generic;
using backend.Exceptions;
using backend.Models;
using backend.Repository;

namespace backend.Service
{
    public class RecipeService : IRecipeService
    {

        private readonly IRecipeRepository repository;

        public RecipeService(IRecipeRepository recipeRepository)
        {
            repository = recipeRepository;
        }

        public UserRecipes AddRecipe(string userId, Recipe recipe)
        {
            return this.UpdateRecipe(101, userId, recipe);
        }

        public UserRecipes CreateRecipe(UserRecipes userRecipe)
        {
            return repository.CreateRecipe(userRecipe);
            //Recipe query = this.GetAllRecipes(recipeUser.UserId).Find(n => n.Id == recipeUser.Recipes.FirstOrDefault().Id);
            //if (query == null)
            //{
            //    return repository.CreateRecipe(recipeUser);
            //}
            //else
            //{
            //    throw new RecipeAlreadyExistsException($"Recipe Already Exists");
            //}
        }

        public bool DeleteRecipe(string userId, int recipeId)
        {
            return repository.DeleteRecipe(userId, recipeId);
            //Recipe query = this.GetAllRecipes(userId).Find(n => n.Id == recipeId);
            //if (query != null)
            //{
            //    return repository.DeleteRecipe(userId, recipeId);
            //}
            //else
            //{
            //    throw new RecipeNotFoundException($"Recipe not found");
            //}
        }

        public List<Recipe> GetAllRecipes(string userId)
        {
            return repository.FindByUserId(userId);
        }

        public Recipe GetRecipe(string userId, int recipeId)
        {
            return this.GetAllRecipes(userId).Find(n => n.Id == recipeId);
        }

        public UserRecipes UpdateRecipe(int recipeId, string userId, Recipe recipe)
        {
            return repository.UpdateRecipe(recipeId, userId, recipe);
        }
    }
}