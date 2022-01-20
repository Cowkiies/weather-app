using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_api.Models
{
    public class FeelsLike
    {
        public float day { get; set; }
        public float night { get; set; }
        public float eve { get; set; }
        public float morn { get; set; }
    }
}
