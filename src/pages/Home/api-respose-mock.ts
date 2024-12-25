import { ResponseWeatherType } from "./schema"

export function getDataMock() {
   const data: ResponseWeatherType[] = [
      {
         forecast: [
            {
               date: "2025-09-03",
               minMax: "20°C / 30°C",
               average: "25°C",
               weather: "partly-cloudy",
               rained: false,
               raintime: null
            },
            {
               date: "2025-09-04",
               minMax: "20°C / 30°C",
               average: "25°C",
               weather: "rain",
               rained: true,
               raintime: "12:00"
            },
            {
               date: "2025-09-05",
               minMax: "20°C / 30°C",
               average: "25°C",
               weather: "rain-sun",
               rained: true,
               raintime: "12:00"
            }
         ],
         years: [
            {
               year: "2024",
               average: "25°C",
               weather: "partly-cloudy",
               bmIndex: "3",
               flightPrice: "R$ 500",
               history: [
                  {
                     date: "09-03",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "partly-cloudy",
                     rained: false,
                     raintime: null
                  },
                  {
                     date: "09-04",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "rain",
                     rained: true,
                     raintime: "12:00"
                  },
                  {
                     date: "09-05",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "rain-sun",
                     rained: true,
                     raintime: "12:00"
                  }
               ]
            },
            {
               year: "2023",
               average: "25°C",
               weather: "partly-cloudy",
               bmIndex: "3",
               flightPrice: "R$ 500",
               history: [
                  {
                     date: "09-03",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "sunny",
                     rained: false,
                     raintime: null
                  },
                  {
                     date: "09-04",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "drizzle",
                     rained: true,
                     raintime: "12:00"
                  },
                  {
                     date: "09-05",
                     minMax: "20°C / 30°C",
                     average: "25°C",
                     weather: "cloudy",
                     rained: true,
                     raintime: "12:00"
                  }
               ]
            }
         ]
      }
   ]

   return {
      data
   }
}