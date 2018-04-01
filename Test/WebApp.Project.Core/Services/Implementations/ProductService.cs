using System;
using System.Collections.Generic;
using Test.Project.Core.Models;
using Test.Project.Core.Repositories.Implementations;

namespace Test.Project.Core.Services.Implementations
{
    public class ProductService
    {
        private readonly ProductRepository productRepository;

        public ProductService(ProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public List<ProductModel> GetAll()
        {
            return this.productRepository.GetAll();
        }

        public ProductModel Get(int id)
        {
            if (id <= 0)
            {
                return null;
            }

            return this.productRepository.Get(id);
        }
    }
}
