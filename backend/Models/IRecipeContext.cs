
using MongoDB.Driver;

namespace backend.Models
{
    public interface IRecipeContext
    {
        IMongoCollection<UserRecipes> Recipes { get; }
    }
}