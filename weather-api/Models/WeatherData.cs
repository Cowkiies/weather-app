using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace weather_api.Models
{
    public class WeatherData
    {
        public long dt;
        public long sunrise;
        public long sunset;
        public float temp;
        public float feels_like;
        public int pressure;
        public int humidity;
        public float dew_point;
        public float uvi;
        public int clouds;
        public int visibility;
        public float wind_speed;
        public int wind_deg;
        public float wind_gust;
        public Weather[] weather;
        public int pop;
    }
}
