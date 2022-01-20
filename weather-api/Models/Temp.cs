using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_api.Models
{
    public class Temp
    {
        public float day { get; set; }
        public float min { get; set; }
        public float max { get; set; }
        public float night { get; set; }
        public float eve { get; set; }
        public float morn { get; set; }
    }
}
