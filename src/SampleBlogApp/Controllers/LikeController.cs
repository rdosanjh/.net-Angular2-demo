using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class LikeController : Controller
    {
        private readonly Context _db;

        public LikeController(Context db)
        {
            this._db = db;
        }

        // GET: api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET api/values/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<bool> Get(Guid id)
        {
            var userId = Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
            if (await _db.ArticleLike.AnyAsync(al => al.Article.Id == id && al.User.Id == userId)
                    || (await _db.ArticleLike.CountAsync(al => al.User.Id == userId)) >= 10)
            {
                return false;
            }


            return true;
        }

        // POST api/values
        [Authorize]
        [HttpPost]
        public async Task Post([FromBody]Article article)
        {

            var userId = Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var user = new DummyUser();
            user.Id = userId;
            _db.Article.Attach(article);
            _db.Users.Attach(user);

            if (_db.ArticleLike.Any(al => al.Article.Id == article.Id && al.User.Id == userId))
            {
                return;
            }

            var articleLike = new ArticleLike
            {
                Article = article,
                User = user,
                DateCreated = DateTime.UtcNow
            };

            _db.ArticleLike.Add(articleLike);
            await _db.SaveChangesAsync();
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
