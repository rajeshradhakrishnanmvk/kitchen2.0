using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IAuthenticationContext context;
        public AuthRepository(IAuthenticationContext dbContext)
        {
            context = dbContext;
        }
        public User FindUserById(string userId)
        {
            return context.Users.Where(u => u.UserId == userId).FirstOrDefault();
        }

        public User LoginUser(string userId, string password)
        {
            return context.Users.Where(u => u.UserId == userId && u.Password == password).FirstOrDefault();
        }

        public bool RegisterUser(User user)
        {
            context.Users.Add(user);
            context.SaveChanges();
            return true;
        }
    }
}