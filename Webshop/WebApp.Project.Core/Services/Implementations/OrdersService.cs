using System;
using System.Collections.Generic;
using WebApp.Project.Core.Models;
using WebApp.Project.Core.Repositories.Implementations;
using Webshop.Project.Core.Models;
using Webshop.Project.Core.Repositories.Implementations;

namespace WebApp.Project.Core.Services.Implementations
{
    
    public class OrdersService
    {
        private readonly OrdersRepository ordersRepository;

        public OrdersService(OrdersRepository ordersRepository)
        {
            this.ordersRepository = ordersRepository;
        }

        public bool AddOrder(OrdersModel order)
        {
            if (
                string.IsNullOrWhiteSpace(order.Firstname) ||
                string.IsNullOrWhiteSpace(order.Lastname) ||
                string.IsNullOrWhiteSpace(order.Adress) ||
                string.IsNullOrWhiteSpace(order.Email) ||
                string.IsNullOrWhiteSpace(order.UserId) ||
                order.Postcode <= 0 ||
                string.IsNullOrWhiteSpace(order.City) ||
                order.Total <= 0
              )
            {
                return false;
            }

            return this.ordersRepository.AddOrder(order);
        }
    }
}
