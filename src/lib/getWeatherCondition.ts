export function getWeatherCondition(weatherCondition: any) {
   let weatherConditionFomartted = ""

   switch (weatherCondition) {
      case "sunny":
         weatherConditionFomartted = "Sunny"
         break
      case "cloudy":
         weatherConditionFomartted = "Cloudy"
         break
      case "partly-cloudy":
         weatherConditionFomartted = "Partly Cloudy"
         break
      case "heavy-rain":
         weatherConditionFomartted = "Heavy Rain"
         break
      case "rain":
         weatherConditionFomartted = "Rain"
         break
      case "rain-sun":
         weatherConditionFomartted = "Rain & Sun"
         break
      case "drizzle":
         weatherConditionFomartted = "Drizzle"
         break
      case "thunderstorm":
         weatherConditionFomartted = "Thunderstorm"
         break
      default:
         weatherConditionFomartted = "Unknown"
         break
   }

   return weatherConditionFomartted
}