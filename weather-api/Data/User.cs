

using weather_api.Models;

namespace weather_api.Data
{
    public class User : UserDTO
    {
        public string Password { get; set; }
        public string Salt { get; set; }

        public User(int Id, string Username, string FirstName, string LastName, string Email, string Password, string Salt) : base(Id, Username, FirstName, LastName, Email)
        {
            this.Password = Password;
            this.Salt = Salt;
        }

    }
}
