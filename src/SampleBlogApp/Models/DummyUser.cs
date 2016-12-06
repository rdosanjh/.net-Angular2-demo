using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class DummyUser
    {
        public DummyUser()
        {
            if (Articles == null)
            {
                Articles = new List<Article>();
            }

            if (LikedArticles == null)
            {
                LikedArticles = new List<ArticleLike>();
            }
        }

        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string DisplayName { get; set; }

        public string PictureUrl { get; set; }

        public virtual ICollection<Article> Articles { get; set; }
        
        public virtual ICollection<ArticleLike> LikedArticles { get; set; } 
    }

    public class UserCredentials
    {
        public string Username { get; set; }
        
        public string Password { get; set; }
    }
}
