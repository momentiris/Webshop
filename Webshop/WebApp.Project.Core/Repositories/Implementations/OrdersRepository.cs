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
                    connection.Execute(
                        "insert into Orders (userid, first_name, last_name, email, adress, post_code, city, total) values(@userid, @first_name, @last_name, @email, @adress, @post_code, @city, @total )",
                        new {userid = @order.UserId, first_name = @order.Firstname, last_name = @order.Lastname, email = order.Email, adress = @order.Adress, post_code = @order.Postcode, city = @order.City, total = @order.Total });

                }
                catch (Exception)
                {
                    return false;
                }
            }

            return true;
        }


    }
}
