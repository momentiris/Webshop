using System;
using System.Collections.Generic;
using Webshop.Project.Core.Models;
using Webshop.Project.Core.Repositories.Implementations;

namespace Webshop.Project.Core.Services.Implementations
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
