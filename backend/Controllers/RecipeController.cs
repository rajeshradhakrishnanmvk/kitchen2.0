using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Extensions;
using backend.Models;
using backend.Service;



namespace backend.Controllers
{
    [Authorize]
    [ExceptionHandler]
    [Route("api/[controller]")]
    public class RecipesController : Controller
    {
        private readonly IRecipeService service;

        public RecipesController(IRecipeService RecipeService)
        {
            service = RecipeService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<string>> Get()
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            return new string[] { accessToken, "value2"};
        }

        // GET api/<controller>/5
        [HttpGet("{userId}")]
        public IActionResult Get(string userId)
        {
            return Ok(service.GetAllRecipes(userId));
        }

        // POST api/<controller>
        [HttpPost("{userId}")]
        public IActionResult Post(string userId,[FromBody]UserRecipes Recipe)
        {
            UserRecipes userRecipes = service.CreateRecipe(Recipe);

            return Ok(userRecipes);
        }

        // PUT api/<controller>/5
        [HttpPut("{userId}/{RecipeId}")]
        public IActionResult Put(string userId,int RecipeId, [FromBody]Recipe Recipe)
        {
            UserRecipes RecipeResult = service.UpdateRecipe(RecipeId, userId, Recipe);
            return Ok(RecipeResult);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{userId}/{RecipeId}")]
        public IActionResult Delete(string userId, int RecipeId)
        {
            return Ok(service.DeleteRecipe(userId, RecipeId));
        }
    }
}