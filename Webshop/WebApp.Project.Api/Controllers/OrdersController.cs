using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Webshop.Project.Core.Services.Implementations;
using Webshop.Project.Core.Repositories.Implementations;
using Webshop.Project.Core.Models;
using Microsoft.Extensions.Configuration;
using WebApp.Project.Core.Models;
using WebApp.Project.Core.Services.Implementations;
using WebApp.Project.Core.Repositories.Implementations;
using WebApp.Project.Api.Models;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Project.Api.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {

        private readonly OrdersService ordersService;

        public OrdersController(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("ConnectionString");
            this.ordersService = new OrdersService(
                new OrdersRepository(connectionString));
        }


        //POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]OrdersModel order)
        {

            var result = this.ordersService.AddOrder(order);
            var response = new CartResultObject(result);

            response.Message = response.Result ?
                "Successfully placed order!" :
                "Something went wrong. Could not place order.";
            
            return this.StatusCode(201, response);
        }

     
    }
    
}
