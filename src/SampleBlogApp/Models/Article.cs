using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication2.Models
{
    public class Article
    {
        public Article()
        {
            if (ArticleLikes == null)
            {
                ArticleLikes = new List<ArticleLike>();
            }
        }

        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public virtual DummyUser Author { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public DateTime DateLastModifed { get; set; }

        public ICollection<ArticleLike> ArticleLikes { get; set; }
    }
}
