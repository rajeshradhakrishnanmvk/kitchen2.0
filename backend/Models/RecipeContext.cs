using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace backend.Models
{
    public class RecipeContext : IRecipeContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;

        public RecipeContext(IConfiguration configuration)
        {
            //client = new MongoClient(Environment.GetEnvironmentVariable("MONGODB_URI"));
             client = new MongoClient(configuration.GetSection("MongoDB:ConnectionString").Value);
            database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
        }

        public IMongoCollection<UserRecipes> Recipes => database.GetCollection<UserRecipes>("Recipes");
    }
}