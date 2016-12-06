using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class ArticlePreview
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }

        public DateTime DateCreated { get; set; }

        public string AuthorName { get; set; }

        public int NumberOfLikes { get; set; }
    }
}
