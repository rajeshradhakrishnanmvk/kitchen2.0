using System;
using System.Linq;
using MongoDB.Driver;
using System.Collections.Generic;
using backend.Models;

namespace backend.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly IRecipeContext context;
        public RecipeRepository(IRecipeContext dbContext)
        {
            context = dbContext;
        }
        public UserRecipes CreateRecipe(UserRecipes noteUser)
        {
            context.Recipes.InsertOne(noteUser);
            return noteUser;
        }

        public bool DeleteRecipe(string userId, int noteId)
        {
            UserRecipes noteUser =  context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            if(noteUser != null)
            {
                Recipe dbRecipe = noteUser.Recipes.Find(n => n.Id == noteId);
                if (dbRecipe != null)
                {
                    noteUser.Recipes.Remove(dbRecipe);
                    context.Recipes.ReplaceOne(nu => nu.UserId == userId, noteUser);
                }
            }

            return true;

       }

        public List<Recipe> FindByUserId(string userId)
        {
            UserRecipes noteUser = context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            List<Recipe> ret = new List<Recipe>();
            if (noteUser != null)
            {
                ret = noteUser.Recipes;
            }
                return ret;
        }

        public UserRecipes UpdateRecipe(int noteId, string userId, Recipe note)
        {
            UserRecipes noteUser = context.Recipes.Find(nu => nu.UserId == userId).ToList().FirstOrDefault();
            if (noteUser == null)
            {
                noteUser = new UserRecipes()
                {
                    UserId = userId,
                    Recipes = new List<Recipe>()
                };
                note.Id = noteId;
                noteUser.Recipes.Add(note);
                this.CreateRecipe(noteUser);
            }
            else
            {
                Recipe dbRecipe = noteUser.Recipes.Find(n => n.Id == note.Id);
                if (dbRecipe != null)
                {
                    noteUser.Recipes.Remove(dbRecipe);

                }
                else
                {
                    //Auto increment PK
                    //Get MAX
                    var lastRecipe = (Recipe)(from nt in noteUser.Recipes
                                          orderby nt.Id descending
                                          select nt).ToList().FirstOrDefault();
                    //If Present increment by 1
                    note.Id = lastRecipe != null ? lastRecipe.Id + 1 : 100;
                }

                noteUser.Recipes.Add(note);
                context.Recipes.ReplaceOne(nu => nu.UserId == userId, noteUser);
            }
            return noteUser;
        }
    }
}