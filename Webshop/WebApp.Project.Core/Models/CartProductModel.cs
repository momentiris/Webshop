using System;
namespace WebApp.Project.Core.Models
{
    public class CartProductModel
    {
            
        public string CartId { get; set; }

        public int ProductId { get; set; }

        public CartProductModel()
        {
        }
		public CartProductModel(string cartid, int productid)
		{
			this.CartId = cartid;
			this.ProductId = productid;
		}
    }
}
