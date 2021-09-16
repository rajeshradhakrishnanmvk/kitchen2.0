using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Service
{
    public class TokenGenerator : ITokenGenerator
    {
        public string TokenExpiry { get; set; }
        public string GetJWTToken(string userId)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName,userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secret_recipe_jwt_contains_category_recipe_user_services"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "AuthServer",
                audience: "recipeapi",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: creds
                );

            // var response = new
            // {
            //     token = new JwtSecurityTokenHandler().WriteToken(token)
            // };
            var response = new JwtSecurityTokenHandler().WriteToken(token);
            TokenExpiry =  (token.ValidTo - token.ValidFrom).TotalSeconds.ToString();
            return JsonConvert.SerializeObject(response);
        }
    }
}