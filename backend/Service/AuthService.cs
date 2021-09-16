using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Exceptions;
using backend.Models;
using backend.Repository;
using Microsoft.Extensions.Logging;

namespace backend.Service
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository repository;
        //private readonly ILogger _logger;

        //public AuthService(IAuthRepository _repository,
        //    ILogger<AuthService> logger)


        public AuthService(IAuthRepository _repository)
        {
            this.repository = _repository;
            //this._logger = logger;
        }
        public User LoginUser(string userId, string password)
        {
            //this._logger.LogInformation("Login User in AuthService for", userId);
            User user = this.repository.LoginUser(userId, password);
            if (user != null)
            {
                //this._logger.LogInformation("Login User in AuthService for", user.UserId);
                return user;

            }
            else
            {
                //this._logger.LogError("User Not Found Exception");
                throw new UserNotFoundException($"User with this id {userId} and password {password} does not exist");
            }
        }

        public bool RegisterUser(User user)
        {
            if (this.repository.RegisterUser(user))
            {
                return true;

            }
            else
            {
                throw new UserNotCreatedException($"User with this id {user.UserId} already exists");
            }
        }
    }
}