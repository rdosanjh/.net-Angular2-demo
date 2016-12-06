using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2
{
    public class AuthUtility
    {
        private readonly Context _db;
        public AuthUtility(Context db)
        {
            _db = db;
        }

        public ClaimsPrincipal GetClaimsPrincipalFromToken(string token)
        {

            var user = _db.Users.SingleOrDefault(u => u.Id.ToString().ToUpperInvariant() == token.ToUpperInvariant());
            if (user == null)
            {
                return null;
            }

            var identity = new DummyIdentity
            {
                Name = user.DisplayName,
                AuthenticationType = "Basic"
            };

            var claimsIdentity = new ClaimsIdentity(identity);
            claimsIdentity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, user.Role));
            var principal = new ClaimsPrincipal(claimsIdentity);
;
            return principal;
        }
    }
}
