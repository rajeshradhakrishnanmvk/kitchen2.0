using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;

namespace backend.Models
{
    public class RecipeContext : IRecipeContext
    {
        private readonly IMongoDatabase database;
        MongoClient client;
        private readonly ILogger _logger;
        public RecipeContext(IConfiguration configuration,ILogger<RecipeContext> logger)
        {

            this._logger = logger;
            try{
              //client = new MongoClient(Environment.GetEnvironmentVariable("MONGODB_URI"));
             string mongoConn = configuration.GetSection("MongoDB:ConnectionString").Value;
             this._logger.LogInformation("Mongo Connection is v4 START");
             this._logger.LogInformation("conn {0}",mongoConn.ToString());
             this._logger.LogInformation("Mongo Connection is v4 END");
             client = new MongoClient(mongoConn);
                database = client.GetDatabase(configuration.GetSection("MongoDB:Database").Value);
            }
            catch(Exception oex){
                this._logger.LogError("Error in Mongo Connection {0}", oex.Message);
                if(oex.InnerException != null){
                    this._logger.LogError("Inner Exception {0} ", oex.InnerException.Message);
                }
            }

            
        }

        public IMongoCollection<UserRecipes> Recipes => database.GetCollection<UserRecipes>("Recipes");
    }
}