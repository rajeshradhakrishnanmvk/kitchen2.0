using backend.Exceptions;
using backend.Extensions;
using backend.Models;
using backend.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace backend.Controllers
{
    [ExceptionHandler]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly ITokenGenerator tokenGenerator;
        private readonly IAuthService service;
        //private readonly ILogger _logger;

        //public AuthController(IAuthService _service)
        //public AuthController(IAuthService _service,ITokenGenerator _tokenGenerator,
        //    ILogger<AuthController> logger)
        public AuthController(IAuthService _service, ITokenGenerator _tokenGenerator)
        {
            this.service = _service;
            this.tokenGenerator = _tokenGenerator;
            //this._logger = logger;
        }

        // POST api/<controller>
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody]User user)
        {
             //this._logger.LogInformation("Register", user.UserId);
            try
            {
                return Created("", this.service.RegisterUser(user));

            }
            catch (UserNotCreatedException )
            {
                //this._logger.LogWarning("User Not Created Exception");
                return new ConflictResult();
            }
            catch(Exception)
            {
                //this._logger.LogError("Error Register", oex.Message);
                return new NotFoundResult();

            }
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]User user)
        {
            try
            {
                //_logger.LogInformation("User {ID} trying to Log", user.UserId);
                User userLogged = this.service.LoginUser(user.UserId, user.Password);
                string value = tokenGenerator.GetJWTToken(user.UserId);
                return Ok(value);

            }
            catch (UserNotFoundException )
            {
                return new NotFoundResult();
            }
        }
    }
}