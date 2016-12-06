using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class ArticleController : Controller
    {
        private readonly Context _db;

        public ArticleController(Context db)
        {
            this._db = db;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<ArticlePreview>> Get()
        {
            var articles = await _db.Article.Select(a => new ArticlePreview()
            {
                Title = a.Title,
                DateCreated = a.DateCreated,
                Id = a.Id,
                AuthorName = a.Author.DisplayName,
                NumberOfLikes = a.ArticleLikes.Count()

            }).OrderByDescending(a => a.DateCreated)
                .ToListAsync();

            return articles ?? new List<ArticlePreview>();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var article = await _db.Article
                .Include(a => a.Author)
                .SingleOrDefaultAsync(a => a.Id == id);
            return Json(article);
        }

        [Authorize]
        public async Task<ActionResult> Post([FromBody]Article article)
        {
            var userId = User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = new DummyUser
            {
                Id = Guid.Parse(userId)
            };
            _db.Users.Attach(user);
            article.Author = user;
            article.DateCreated = DateTime.UtcNow;
            article.DateLastModifed = DateTime.UtcNow;
            _db.Article.Add(article);

            await _db.SaveChangesAsync();

            return Created(article.Id.ToString(), article);

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [Authorize(Roles = "publisher")]
        public async Task Put(Guid id, [FromBody]Article article)
        {
            var userId = Guid.Parse(User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value);
            var dbArticle = await _db.Article.SingleOrDefaultAsync(a => a.Author.Id == userId && a.Id == id);
            dbArticle.Title = article.Title;
            dbArticle.Content = article.Content;
            dbArticle.DateLastModifed = DateTime.UtcNow;
            _db.Article.Update(dbArticle);
            await _db.SaveChangesAsync();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            var userId = User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var article = await _db.Article.SingleOrDefaultAsync(a => a.Author.Id == Guid.Parse(userId) && a.Id == id);
            if (article == null)
            {
                return;
            }
            _db.Remove(article);
            await _db.SaveChangesAsync();
        }
    }
}