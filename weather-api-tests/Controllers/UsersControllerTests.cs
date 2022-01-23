using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using weather_api_tests.Data;
using weather_api.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;
using weather_api.Controllers;
using weather_api.Models;

namespace weather_api_tests.Controllers
{
    public class UsersControllerTests : WeatherApiControllerTest
    {
        public UsersControllerTests() : base(
            new DbContextOptionsBuilder<WeatherDbContext>().UseMySQL("server=localhost;user=root;database=db_test;password=PFxBAeKwGXgKQ7F8wNjXakzdXnzkMYuT;port=3306").Options)
        {

        }

        [Fact]
        public void Can_get_users()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new UsersController(context);
            var users = controller.GetUsers().ToList();

            Assert.Equal(2, users.Count);
            Assert.Equal("John", users[0].FirstName);
            Assert.Equal("Jane", users[1].FirstName);
        }

        [Fact]
        public async void Can_get_user_by_id()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new UsersController(context);
            var user = await controller.GetUser(1);

            Assert.Equal(1, user.Value.Id);
            Assert.Equal("John", user.Value.FirstName);
            Assert.Equal("Doe", user.Value.LastName);
        }

        [Fact]
        public async void Can_update_user()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new UsersController(context);
            User newUser = new(1, "JD1", "John", "Doh", "johndoe@gmail.com", "password", "M+eNFmS2XRC30up5c7tEhw==");
            var user = await controller.PutUser(1, newUser);

            var updatedUser = await controller.GetUser(1);

            Assert.Equal(1, updatedUser.Value.Id);
            Assert.Equal("John", updatedUser.Value.FirstName);
            Assert.Equal("Doh", updatedUser.Value.LastName);
        }

        [Fact]
        public async void Can_create_new_user()
        {
            using var context = new WeatherDbContext(ContextOptions);
            var controller = new UsersController(context);
            User newUser = new(3, "JD3", "Jane", "Doh", "janedoh@gmail.com", "password", "");

            await controller.PostUser(newUser);

            var createdUser = await controller.GetUser(3);

            Assert.Equal(3, createdUser.Value.Id);
            Assert.Equal("Jane", createdUser.Value.FirstName);
            Assert.Equal("Doh", createdUser.Value.LastName);
        }
    }
}
