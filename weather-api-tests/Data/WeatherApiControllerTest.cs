using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using weather_api.Data;

namespace weather_api_tests.Data
{
    public class WeatherApiControllerTest
    {
        protected DbContextOptions<WeatherDbContext> ContextOptions { get; }
        protected WeatherApiControllerTest(DbContextOptions<WeatherDbContext> contextOptions)
        {
            ContextOptions = contextOptions;
            Seed();
        }

        private void Seed()
        {
            using var context = new WeatherDbContext(ContextOptions);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var one = new User(1, "JD1", "John", "Doe", "johndoe@gmail.com", "JCyOa90bUsSNerqEBrMRSPRmpqk0tZK0ayEDr44eXZg=", "M+eNFmS2XRC30up5c7tEhw==");

            var two = new User(2, "JD2", "Jane", "Doe", "janedoe@gmail.com", "etH/z/Jolwml5HLkKRtUAPykKB9O6seBRTyeHJq5kTk==", "hUdWkRoj/WrS6a6ah95gAw==");

            context.AddRange(one, two);

            context.SaveChanges();
        }
    }
}
