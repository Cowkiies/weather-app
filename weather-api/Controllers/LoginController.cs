using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weather_api.Data;
using weather_api.Helpers;
using System.Diagnostics;

namespace weather_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly WeatherDbContext _context;

        public LoginController(WeatherDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public ActionResult LoginUser(User login)
        {
            if (!UserExists(login.Username))
            {
                return NotFound();
            }

            User user = _context.User.Where(e => e.Username == login.Username).FirstOrDefault();
            string hashed = PasswordHasher.HashPassword(login.Password, Convert.FromBase64String(user.Salt));

            if (hashed != user.Password)
            {
                return Unauthorized();
            }

            string token = TokenManager.GenerateToken(user.Username);
            var data = new { user.Username, token };
            return Ok(data);
        }

        private bool UserExists(string username)
        {
            return _context.User.Any(e => e.Username == username);
        }
    }
}
