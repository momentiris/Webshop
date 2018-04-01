using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Test.Project.Core.Models;
using Test.Project.Core.Repositories.Implementations;
using Test.Project.Core.Services.Implementations;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Project.Api.Controllers
{
    [Route("api/products")]
    public class ProductController : Controller
    {
        private readonly ProductService productService;

        public ProductController(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ConnectionString");
            this.productService = new ProductService(
                new ProductRepository(connectionString));
        }

        // GET api/values
        [HttpGet]
        public List<ProductModel> Get()
        {
            return this.productService.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ProductModel Get(int id)
        {
            return this.productService.Get(id);
        }

        // POST api/values
        //[HttpPost]
        //public void Post([FromBody]ProductModel product)
        //{
        //    if (product.Id <= 0)
        //    {
        //        this.CartService.(product);
        //    }
        //    else
        //    {
        //        this.productService.Edit(product);
        //    }
        //}

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
