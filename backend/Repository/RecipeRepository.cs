using System;
using System.Linq;
using MongoDB.Driver;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using backend.Models;

namespace backend.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly IRecipeContext context;
        private readonly ILogger _logger;
        public RecipeRepository(IRecipeContext dbContext,ILogger<RecipeContext> logger)
        {
            context = dbContext;
            this._logger = logger;
        }
        public UserRecipes CreateRecipe(UserRecipes repiceUser)
        {
            try
            {
                UserRecipes userRecipes =  context.Recipes.Find(nu => nu.UserId == repiceUser.UserId).ToList().FirstOrDefault();
                this._logger.LogInformation("CreateRecipe START");
                this._logger.LogInformation(repiceUser.Recipes[0].Name);
                
                if(userRecipes != null)
                {
                    this._logger.LogInformation("CreateRecipe Delete START");
                    this._logger.LogInformation(userRecipes.Recipes[0].Name);
                    var deleteFilter = Builders<UserRecipes>.Filter.Eq("UserId", repiceUser.UserId);
                    context.Recipes.DeleteOne(deleteFilter);
                    this._logger.LogInformation("CreateRecipe Delete END");
                }
                
                context.Recipes.InsertOne(repiceUser);
                this._logger.LogInformation("CreateRecipe END");
            }
            catch(Exception oex){
                this._logger.LogError("Error in Create  {0} ", oex.Message);
                if(oex.InnerException != null){
                    this._logger.LogError("Inner Exception {0}", oex.InnerException.Message);
                }
            }

            return repiceUser;
        }
        public bool DeleteRecipe(string userId, int repiceId)
        {
            UserRecipes repiceUser =  context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            if(repiceUser != null)
            {
                Recipe dbRecipe = repiceUser.Recipes.Find(n => n.Id == repiceId);
                if (dbRecipe != null)
                {
                    repiceUser.Recipes.Remove(dbRecipe);
                    context.Recipes.ReplaceOne(nu => nu.UserId == userId, repiceUser);
                }
            }

            return true;

       }

        public List<Recipe> FindByUserId(string userId)
        {
            UserRecipes repiceUser = context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            List<Recipe> ret = new List<Recipe>();
            if (repiceUser != null)
            {
                ret = repiceUser.Recipes;
            }
                return ret;
        }

        public UserRecipes UpdateRecipe(int repiceId, string userId, Recipe repice)
        {
            UserRecipes repiceUser = context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            if (repiceUser == null)
            {
                repiceUser = new UserRecipes()
                {
                    UserId = userId,
                    Recipes = new List<Recipe>()
                };
                repice.Id = repiceId;
                repiceUser.Recipes.Add(repice);
                this.CreateRecipe(repiceUser);
            }
            else
            {
                Recipe dbRecipe = repiceUser.Recipes.Find(n => n.Id == repice.Id);
                if (dbRecipe != null)
                {
                    repiceUser.Recipes.Remove(dbRecipe);

                }
                else
                {
                    //Auto increment PK
                    //Get MAX
                    var lastRecipe = (Recipe)(from nt in repiceUser.Recipes
                                          orderby nt.Id descending
                                          select nt).ToList().FirstOrDefault();
                    //If Present increment by 1
                    repice.Id = lastRecipe != null ? lastRecipe.Id + 1 : 100;
                }

                repiceUser.Recipes.Add(repice);
                context.Recipes.ReplaceOne(nu => nu.UserId == userId, repiceUser);
            }
            return repiceUser;
        }
    }
}