export function getWeatherIcon(weather: any) {
   let avatar = ""

   switch (weather) {
      case "sunny":
         avatar = "/src/assets/icons/sunny.svg"
         break
      case "cloudy":
         avatar = "src/assets/icons/cloudy.svg"
         break
      case "partly-cloudy":
         avatar = "src/assets/icons/partly-cloudy.svg"
         break
      case "heavy-rain":
         avatar = "src/assets/icons/heavy-rain.svg"
         break
      case "rain":
         avatar = "src/assets/icons/rain.svg"
         break
      case "rain-sun":
         avatar = "src/assets/icons/rain-sun.svg"
         break
      case "drizzle":
         avatar = "src/assets/icons/drizzle.svg"
         break
      case "thunderstorm":
         avatar = "src/assets/icons/thunderstorm.svg"
         break
      default:
         avatar = "src/assets/icons/sunny.svg"
         break
   }

   return avatar
}