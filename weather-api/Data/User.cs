

using weather_api.Models;

namespace weather_api.Data
{
    public class User : UserDTO
    {
        public string Password { get; set; }
        public string Salt { get; set; }

    }
}
