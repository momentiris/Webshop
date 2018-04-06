using System;
using System.Collections.Generic;
using Webshop.Project.Core.Models;
using Webshop.Project.Core.Repositories.Implementations;
using WebApp.Project.Core.Models;

using Webshop.Project.Core.Repositories;

namespace Webshop.Project.Core.Services.Implementations
{
    public class CartService
    {
        private readonly ICartRepository cartRepository;

        public CartService(ICartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }


        public List<ProductModel> Get(string id)
        {
            if (String.IsNullOrWhiteSpace(id))
            {
                return null;
            }

            return this.cartRepository.Get(id);
        }

        public bool AddToCart(CartProductModel cart)
        {
            if (cart.ProductId <= 0 || String.IsNullOrWhiteSpace(cart.CartId))
            {
                return false;
            }
            return this.cartRepository.AddToCart(cart);
        }

        public bool Delete(string userid, int productid)
        {
            if (string.IsNullOrWhiteSpace(userid) || productid <= 0)
            {
                return false;
            }

            return this.cartRepository.Delete(userid, productid);
        }


    }
}
