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


    }
}