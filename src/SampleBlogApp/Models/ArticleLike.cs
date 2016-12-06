using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class ArticleLike
    {
        public int Id { get; set; }

        public DummyUser User { get; set; }

        public Article Article { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

    }
}
