using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class AuthenticationContext : DbContext, IAuthenticationContext
    {
        public AuthenticationContext() { }

        public AuthenticationContext(DbContextOptions options) : base(options) {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);
                entity.Property(e => e.FirstName).IsRequired();
                entity.Property(e => e.Password).IsRequired();
            });
           
        }
    }
}