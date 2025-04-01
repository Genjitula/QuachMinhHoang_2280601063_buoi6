using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuachMinhHoang_2280601063.Models;
using QuachMinhHoang_2280601063.Repository;

namespace QuachMinhHoang_2280601063.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 📌 1. Lấy danh sách sản phẩm (GET)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // 📌 2. Lấy sản phẩm theo ID (GET)
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }
        // 📌 6. Xem chi tiết sản phẩm (GET - Detailed)
        [HttpGet("details/{id}")]
        public async Task<ActionResult<Product>> GetProductDetails(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            return Ok(new
            {
                product.Id,
                product.Name,
                product.Price,
                // Thêm các thông tin chi tiết khác nếu có
            });
        }

        // 📌 3. Thêm sản phẩm mới (POST)
        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // 📌 4. Cập nhật sản phẩm (PUT)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // 📌 5. Xóa sản phẩm (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
