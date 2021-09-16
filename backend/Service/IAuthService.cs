using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Service
{
    public interface IAuthService
    {
        bool RegisterUser(User user);
        User LoginUser(string userId, string password);
    }
}