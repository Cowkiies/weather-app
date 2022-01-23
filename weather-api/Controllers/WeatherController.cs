using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using weather_api.Models;
using System.Diagnostics;
using Newtonsoft.Json;
using Microsoft.Net.Http.Headers;
using weather_api.Helpers;
using weather_api.Data;
using System.Linq;

namespace weather_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly string apiKey;
        public HttpClient Client { get; }
        private readonly WeatherDbContext _context;


        public WeatherController(IConfiguration configuration, HttpClient httpClient, WeatherDbContext context)
        {
            _context = context;
            httpClient.BaseAddress = new Uri(configuration.GetSection("OpenWeatherMap").GetValue<string>("BaseUrl"));
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            Client = httpClient;
            apiKey = configuration.GetSection("OpenWeatherMap").GetValue<string>("ApiKey");
        }

        [HttpGet]
        public async Task<ActionResult<Forecast>> GetWeatherData()
        {
            string bearerToken;
            try
            {
                bearerToken = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            } catch (NullReferenceException)
            {
                return Unauthorized();
            }

            string tokenUsername = TokenManager.ValidateToken(bearerToken);
            if (!_context.User.Any(u => u.Username == tokenUsername))
            {
                return Unauthorized();
            }
            string lat = HttpContext.Request.Query["lat"].ToString();
            string lon = HttpContext.Request.Query["lon"].ToString();
            var response = await Client.GetAsync($"data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely&units=metric&appid={apiKey}");
            var content = await response.Content.ReadAsStringAsync();
            var jzon = JsonConvert.DeserializeObject<Forecast>(content);
            return Ok(jzon);
        }
    }
}
