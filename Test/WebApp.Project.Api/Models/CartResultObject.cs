using System;
namespace WebApp.Project.Api.Models
{
    public class CartResultObject
    {
        public string Message;
        public bool Result;

        public CartResultObject(bool result)
        {
            this.Result = result;
            //this.Message = result ?
                //"Successfully added product to cart!" :
                //"Something went wrong, product not added to cart.";
        }
    }
}
