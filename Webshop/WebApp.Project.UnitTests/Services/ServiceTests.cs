 using System.Collections.Generic;
using FakeItEasy;
using NUnit.Framework;

using Webshop.Project.Core.Models;
using Webshop.Project.Core.Repositories;

using Webshop.Project.Core.Services.Implementations;

namespace WebApp.Project.UnitTests.Services
{
    public class CartServiceTests
    {
        private CartService cartService;

        private ICartRepository cartRepository;

        [SetUp]
        public void SetUp()
        {
            this.cartRepository = A.Fake<ICartRepository>();
            this.cartService = new CartService(this.cartRepository);
        }

        [Test]
        public void Get_ReturnsExpectedProductModel()
        {
            // Arrange
            var cart = new List<ProductModel> { };
           

            // Inform FakeItEasy tha a call to Get should return products in cart.
            A.CallTo(() => this.cartRepository.Get("asdf")).Returns(cart);

            // Act
            var result = this.cartService.Get("asdf");

            // Assert
            Assert.That(result, Is.EqualTo(cart));

        }

      
    }
}
