using System;
namespace Webshop.Project.Core.Models
{
    public class ProductModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Price { get; set; }

        public string Image { get; set; }

        public int quantity { get; set; }
    }
}
