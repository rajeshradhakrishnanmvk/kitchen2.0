using System;
namespace backend.Exceptions
{
    public class RecipeNotFoundException:ApplicationException
    {
        public RecipeNotFoundException() { }
        public RecipeNotFoundException(string message) : base(message) { }
    }
}
