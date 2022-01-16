using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_api.Models
{
    public class Forecast
    {
        public float lat;
        public float lon;
        public string timezone;
        public int timezoneOffset;
        public WeatherData current;
        public WeatherData hourly;
        public WeatherData daily;
    }
}
