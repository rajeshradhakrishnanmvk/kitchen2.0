using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Recipe
    {
        [BsonId]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
