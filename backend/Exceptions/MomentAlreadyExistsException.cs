using System;
namespace backend.Exceptions
{
    public class RecipeAlreadyExistsException:ApplicationException
    {
        public RecipeAlreadyExistsException() { }
        public RecipeAlreadyExistsException(string message) : base(message) { }
    }
}