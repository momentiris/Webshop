using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test.Project.Core.Services.Implementations;
using Test.Project.Core.Repositories.Implementations;
using Test.Project.Core.Models;
using Microsoft.Extensions.Configuration;
using WebApp.Project.Core.Models;
using WebApp.Project.Api.Models;

namespace WebApp.Project.Api.Controllers
{
    [Route("api/[controller]")]
    public class CartController : Controller
    {

        private readonly CartService cartService;

        public CartController(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ConnectionString");
            this.cartService = new CartService(
                new CartRepository(connectionString));
        }

        // GET api/values
        [HttpGet]
        public List<CartProductModel> Get()
        {
            return this.cartService.GetAll();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public List<ProductModel> Get(string id)
        {
            return this.cartService.Get(id);
        }

        //POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]CartProductModel cart)
        {
            
            var result = this.cartService.AddToCart(cart);
            var response = new CartResultObject(result);

            response.Message = response.Result ? 
                "Successfully added product to cart!" : 
                "Something went wrong. Could not add product to cart.";
            
            return this.StatusCode(201, response);
        }
       
        // DELETE api/values/5
        [HttpDelete("{userid}/{productid}")]
        public IActionResult Delete(string userid, int productid)
        {
            var result = this.cartService.Delete(new CartProductModel(userid, productid));
            var response = new CartResultObject(result);

            response.Message = response.Result ?
                "Successfully deleted product from cart!" :
                "Something went wrong. Could not delete product from cart.";
            
            return this.StatusCode(200, response);
        }
    }
}
