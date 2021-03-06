using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weather_api.Data;
using weather_api.Models;
using weather_api.Helpers;

namespace weather_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly WeatherDbContext _context;

        public UsersController(WeatherDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IQueryable<UserDTO> GetUsers()
        {
            return from user in _context.User
                   select MapFromUserToDTO(user);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return MapFromUserToDTO(user);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User newUser)
        {
            if (id != newUser.Id)
            {
                return BadRequest();
            }

            string hashed = PasswordHasher.HashPassword(newUser.Password, Convert.FromBase64String(newUser.Salt));
            newUser.Password = hashed;
            _context.Entry(newUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostUser(User user)
        {
            // Error Handling for duplicates username and in general
            byte[] salt = PasswordHasher.CreateSalt();
            string hashed = PasswordHasher.HashPassword(user.Password, salt);
            user.Password = hashed;
            user.Salt = Convert.ToBase64String(salt);

            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetUser", new { id = user.Id }, MapFromUserToDTO(user));
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        private static UserDTO MapFromUserToDTO(User user)
        {
            return new(user.Id, user.Username, user.FirstName, user.LastName, user.Email);
        }
    }
}
