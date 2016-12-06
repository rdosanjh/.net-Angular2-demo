using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebApplication2.Models;

namespace WebApplication2.Extentions
{
    public static class ApplicationBuilderExtentions
    {
        public static void SeedDb(this IApplicationBuilder app)
        {
            // Get an instance of the DbContext from the DI container
            using (var context = app.ApplicationServices.GetRequiredService<Models.Context>())
            {
                if (context.Users.Any())
                {
                    return;
                }

                var publisher = GetPublisher();
                context.Users.Add(publisher);
                context.SaveChanges();


                var reader = new DummyUser
                {
                    Username = "reader",
                    DisplayName = "Reader 1",
                    Role = "reader"
                };
                context.Users.Add(reader);
                context.SaveChanges();

                context.ArticleLike.AddRange(new List<ArticleLike>
                    {
                        new ArticleLike
                        {
                            Article = publisher.Articles.ToList()[0],
                            DateCreated = DateTime.UtcNow,
                            User = reader
                        },
                        new ArticleLike
                        {
                            Article = publisher.Articles.ToList()[2],
                            DateCreated = DateTime.UtcNow,
                            User = reader
                        },
                        new ArticleLike
                        {
                            Article = publisher.Articles.ToList()[0],
                            User = publisher,
                            DateCreated = DateTime.UtcNow
                        }
                    });
                context.SaveChanges();

            }
        }

        private static DummyUser GetPublisher()
        {
            return new DummyUser
            {
                DisplayName = "Publisher",
                Username = "publisher",
                Role = "publisher",
                Articles = new List<Article>()
                {
                    GenerateArticle("This is the first article"),
                    GenerateArticle("Second article over here"),
                    GenerateArticle("Article Number 3")
                }
            };
        }

        private static Article GenerateArticle(string title)
        {
            var article = new Article();
            article.Title = title;

            var articleBuilder = new StringBuilder();
            for (int i = 0; i <= 100; i++)
            {

                articleBuilder.AppendLine(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ");
            }

            article.Content = articleBuilder.ToString();
            article.DateCreated = DateTime.UtcNow;
            article.DateLastModifed = DateTime.UtcNow;
            return article;
        }
    }
}
