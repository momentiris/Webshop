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

        //public List<CartProductModel> GetAll()
        //{
        //    using (var connection = new MySqlConnection(this.connectionString))
        //    {
        //        return connection.Query<CartProductModel>("select * from carts").ToList();
        //    }
        //}

        public List<ProductModel> Get(string userid)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<ProductModel>("SELECT Products.Id, Name, Description, Price, Image FROM Products JOIN Carts ON Products.Id = Carts.productid WHERE Carts.cartid = @userid ",
                                                      new { userid }).ToList();
            } 
        }

        public bool AddToCart(CartProductModel cart)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                var findMatching = connection.Query<CartProductModel>("SELECT * FROM Carts WHERE Carts.cartid = @userid AND Carts.productid = @productid",
                                                                      new { userid = @cart.CartId, productid = @cart.ProductId });
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

        public bool Delete(string userid, int productid)
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                try
                {
                    connection.Execute(
                        "DELETE FROM Carts WHERE productid = @productid AND cartid = @userid LIMIT 1",
                        new { productid = @productid, userid = @userid});

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
