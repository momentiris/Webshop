using System;
namespace WebApp.Project.Core.Models
{
    public class OrdersModel
    {
        public string UserId { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Adress { get; set; }

        public string City { get; set; }

        public string Email { get; set; }

        public int Postcode { get; set; }

        public int Total { get; set; }
    }
}
