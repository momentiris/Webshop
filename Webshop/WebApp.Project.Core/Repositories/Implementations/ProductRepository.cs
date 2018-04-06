using System;
using System.Collections.Generic;
using Webshop.Project.Core.Models;
using System.Linq;
using MySql.Data.MySqlClient;
using Dapper;
using System.Diagnostics.Contracts;

namespace Webshop.Project.Core.Repositories.Implementations
{
    public class ProductRepository
    {
        private readonly string connectionString;
        
        public ProductRepository (string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<ProductModel> GetAll()
        {
            using (var connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<ProductModel>("select * from products").ToList();
            }
        }

        public ProductModel Get(int id)
        {
            Contract.Ensures(Contract.Result<ProductModel>() != null);
            using (var connection = new MySqlConnection(this.connectionString))
            {
                 return connection.QuerySingleOrDefault<ProductModel>("select * from products where id = @id", new { id });
               
            }
        }


    }
}
