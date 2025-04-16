using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace FinalExamPractice.Data;

public class WaterDbContext : DbContext
{
    public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Project> Projects { get; set; }
    
}