using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebApplication2.Models
{
    public class Context : DbContext
    {
        public Context(DbContextOptions options)
            : base(options)
        { }

        public DbSet<DummyUser> Users { get; set; }

        public DbSet<Article> Article { get; set; }

        public DbSet<ArticleLike> ArticleLike { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        
    }
}
