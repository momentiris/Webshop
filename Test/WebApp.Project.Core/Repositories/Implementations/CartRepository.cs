using System;
using System.Collections.Generic;
using Test.Project.Core.Models;
using System.Linq;
using MySql.Data.MySqlClient;
using Dapper;
using WebApp.Project.Core.Models;

namespace Test.Project.Core.Repositories.Implementations
{
    public class CartRepository
    {
        private readonly string connectionString;

        public CartRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<CartProductModel> GetAll()
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<CartProductModel>("select * from carts").ToList();
            }
        }

        public List<ProductModel> Get(string userid)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<ProductModel>("SELECT Name, Description, Price, Image FROM Products JOIN Carts ON Products.Id = Carts.productid WHERE Carts.cartid = @userid ", new { userid }).ToList();
            } 
        }

        public bool AddToCart(CartProductModel cart)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                try
                {
                    connection.Execute(
                        "insert into Carts (productid, cartid) values(@productid, @cartid)",
                        new { productid = @cart.ProductId, cartid = @cart.CartId });

                }
                catch (Exception)
                {
                    return false; 
                }
            }

            return true;
        }

        public bool Delete(CartProductModel cart)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                if (cart.ProductId == 0)
                    return false;
                try
                {
                    connection.Execute(
                        "DELETE FROM Carts WHERE productid = @productid AND cartid = @userid",
                        new { productid = @cart.ProductId, userid = @cart.CartId});

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
