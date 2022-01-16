using System.ComponentModel.DataAnnotations;


namespace weather_api.Models
{
    public class UserDTO
    {
        public int Id { get; set; }

        [MaxLength(32)]
        public string Username { get; set; }

        public string Role { get; set; }
    }
}
