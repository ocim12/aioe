using Microsoft.EntityFrameworkCore;

namespace aioe.Models
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base (options) {
            
        }

        public UserContext(){
        }

        public DbSet<User> Users {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if(!optionsBuilder.IsConfigured) {
                optionsBuilder.UseSqlServer("Server=.;Database=Users; Trusted_Connection=true;");
            }
        }

    }
}