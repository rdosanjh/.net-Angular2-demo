using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly Context _db;

        public UserController(Context db)
        {
            _db = db;
        }

        public async Task<ActionResult> Get([FromQuery]UserCredentials creds)
        {
            if (!ModelState.IsValid)
            {
                return Unauthorized();
            }

            var user = await _db.Users
                .SingleOrDefaultAsync(u => u.Username == creds.Username);

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult> Post([FromBody]DummyUser dummyUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (await _db.Users.AnyAsync(u => u.Username == dummyUser.Username))
            {
                return StatusCode((int)HttpStatusCode.Conflict);
            }
            _db.Users.Add(dummyUser);

            if (await _db.SaveChangesAsync() == 1)
            {
                return Created(dummyUser.Id.ToString(), dummyUser);
            }

            return StatusCode((int)HttpStatusCode.InternalServerError);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
