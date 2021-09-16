using System;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Ingredient
    {
        [BsonId]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
