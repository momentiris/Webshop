using System;
using System.Collections.Generic;
using WebApp.Project.Core.Models;
using Webshop.Project.Core.Models;


namespace Webshop.Project.Core.Repositories
{
    public interface ICartRepository
    {
        List<ProductModel> Get(string userid);

        bool AddToCart(CartProductModel cart);

        bool Delete(string userid, int productid);
    }
}
