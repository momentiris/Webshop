using System;
using System.Collections.Generic;
using Webshop.Project.Core.Models;
using System.Linq;
using MySql.Data.MySqlClient;
using Dapper;
using WebApp.Project.Core.Models;

namespace WebApp.Project.Core.Repositories.Implementations
{
    public class OrdersRepository
    {
        private readonly string connectionString;

        public OrdersRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public bool AddOrder(OrdersModel order)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
              
                try
                {
                    var orderId = connection.QuerySingleOrDefault<int>(
                        "insert into Orders ( first_name, last_name, email, adress, post_code, city, total) values( @first_name, @last_name, @email, @adress, @post_code, @city, @total ); select last_insert_id()",
                        new {first_name = @order.Firstname, last_name = @order.Lastname, email = order.Email, adress = @order.Adress, post_code = @order.Postcode, city = @order.City, total = @order.Total });

					this.AddProductsToOrder(order.UserId, orderId);
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }


            //return true;
        }

        public bool AddProductsToOrder(string userid, int orderid )
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                try
                {
					var definiteCart = connection.Query<ProductModel>("SELECT Products.Id, Name, Description, Price, Image FROM Products JOIN Carts ON Products.Id = Carts.productid WHERE Carts.cartid = @userid ",
					                               new { userid }).ToList();

                    foreach (var item in definiteCart)
                    {
                        connection.Execute("insert into OrderProducts (order_id, product_id, price) values(@order_id, @product_id, @price)",
                                           new { order_id = orderid, product_id = item.Id, price = item.Price  });
                    }
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            } 
        }


    }
}
