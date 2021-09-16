using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class UserRecipes
    {
        [BsonId]
        public string UserId { get; set; }
        public List<Recipe> Recipes { get; set; }
    }
}