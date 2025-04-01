using Microsoft.EntityFrameworkCore;
using QuachMinhHoang_2280601063.Models;

namespace QuachMinhHoang_2280601063.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet cho các model
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình cho Product entity
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id); // Thiết lập khóa chính

                entity.Property(p => p.Name)
                    .IsRequired() // Yêu cầu không null
                    .HasMaxLength(100); // Giới hạn độ dài

                entity.Property(p => p.Price)
                    .HasColumnType("decimal(18,2)"); // Cấu hình kiểu dữ liệu decimal

                // Có thể thêm các cấu hình khác nếu cần
            });

            // Nếu có các model khác, thêm cấu hình tại đây
        }
    }
}