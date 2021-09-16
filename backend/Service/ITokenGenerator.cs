using System;


namespace backend.Service
{
    public interface ITokenGenerator
    {
        public string TokenExpiry { get; set; }

        string GetJWTToken(string userId);
    }
}