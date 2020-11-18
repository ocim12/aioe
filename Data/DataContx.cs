using aioe.Models;
using Microsoft.EntityFrameworkCore;

namespace aioe.Data
{
    public class DataContx : DbContext
    {
        public DataContx(DbContextOptions<DataContx> options) : base (options) {
        
            
        }
        public DbSet<User> Users { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        //     if(!optionsBuilder.IsConfigured) {
        //         optionsBuilder.UseSqlServer("Server=.;Database=Users; Trusted_Connection=true;");
        //     }
        // }
    }
}