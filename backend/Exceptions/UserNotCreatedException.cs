using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Exceptions
{
    public class UserNotCreatedException:ApplicationException
    {
        public UserNotCreatedException() { }
        public UserNotCreatedException(string message) : base(message) { }
    }
}