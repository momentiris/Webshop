using System;
using System.Collections.Generic;
using Test.Project.Core.Models;
using Test.Project.Core.Repositories.Implementations;
using WebApp.Project.Core.Models;

namespace Test.Project.Core.Services.Implementations
{
    public class CartService
    {
        private readonly CartRepository cartRepository;

        public CartService(CartRepository cartRepository)
        {
            this.cartRepository = cartRepository;
        }

        //public List<CartProductModel> GetAll()
        //{
        //    return this.cartRepository.GetAll();
        //}

        public List<ProductModel> Get(string id)
        {
            //if (id <= 0)
            //{
            //    return null;
            //}

            return this.cartRepository.Get(id);
        }

        public bool AddToCart(CartProductModel cart)
        {
            //if (int.IsNullOrEmpty(cart.ProductId) || int.IsNullOrEmpty(cart.CartId))
            //{
            //    return false;
            //}

            //return product;

            return this.cartRepository.AddToCart(cart);
        }

        public bool Delete(string userid, int productid)
        {
            //if (string.IsNullOrEmpty(cart.ProductId) || string.IsNullOrEmpty(cart.CartId))
            //{
            //    return false;
            //}

            return this.cartRepository.Delete(userid, productid);
        }


    }
}
