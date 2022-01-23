using System.ComponentModel.DataAnnotations;


namespace weather_api.Models
{
    public class UserDTO
    {
        public int Id { get; set; }

        [MaxLength(32)]
        public string Username { get; set; }

        public string FirstName { get; set; }
        public string LastName{ get; set; }
        public string Email { get; set; }

        public UserDTO(int Id, string Username, string FirstName, string LastName, string Email)
        {
            this.Id = Id;
            this.Username = Username;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
        }
    }
}
