using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_api.Models
{
    public class Forecast
    {
        public float lat { get; set; }
        public float lon { get; set; }
        public string timezone { get; set; }
        public int timezoneOffset { get; set; }
        public WeatherData current { get; set; }
        public WeatherData[] hourly { get; set; }
        public DailyWeatherData[] daily { get; set; }
    }
}
