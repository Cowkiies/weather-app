using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using weather_api_tests.Data;
using weather_api.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;
using weather_api.Controllers;
using weather_api.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace weather_api_tests.Controllers
{
    public class LoginControllerTests : WeatherApiControllerTest
    {
        public LoginControllerTests() : base(
            new DbContextOptionsBuilder<WeatherDbContext>()
            .UseMySQL("server=localhost;user=root;database=db_test;password=PFxBAeKwGXgKQ7F8wNjXakzdXnzkMYuT;port=3306")
            .Options)
        {

        }

        [Fact]
        public void Can_login()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new LoginController(context);

            User login = new(0, "JD1", "", "", "", "password", "");
            var response = controller.LoginUser(login);

            Assert.IsType<OkObjectResult>(response);
        }

        [Fact]
        public void Can_return_unauthorized()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new LoginController(context);

            User login = new(0, "JD1", "", "", "", "wrong_pass", "");
            var response = controller.LoginUser(login);

            Assert.IsType<UnauthorizedResult>(response);
        }
    }
}
