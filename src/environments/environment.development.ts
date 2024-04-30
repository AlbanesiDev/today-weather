/**
 * To do production tests you only have to change "IS_PRODUCTION" to true and
 * replace the `**************` with your API key.
 */
export const environment = {
  IS_PRODUCTION: false,
  WEATHER_OWM_KEY: "******************************",
  MOCK: {
    GEOLOCATION: "/assets/mocks/geolocation.json",
    WEATHER_OWM_ONE: "/assets/mocks/weather-owm-one.json",
    WEATHER_OWM_GEOCODING: "/assets/mocks/weather-owm-geocoding.json",
    WEATHER_OWM_AQI: "/assets/mocks/weather-owm-aqi.json",
  },
  ENDPOINT: {
    GEOLOCATION: "https://ipapi.co/json",
    WEATHER_OWM_ONE: "https://api.openweathermap.org/data/3.0/onecall?",
    WEATHER_OWM_GEOCODING: "https://api.openweathermap.org/geo/1.0/direct?",
    WEATHER_OWM_AQI: "https://api.openweathermap.org/data/2.5/air_pollution?",
  },
  LOCAL_STORAGE: {
    userNotificationsKey: "userNotifications",
    userUnitsKey: "userUnits",
    userThemeKey: "userTheme",
    userIconPreferences: "userIconsStyle",
    userFeaturesKey: [
      {
        list: "userFeaturesList",
        active: "userFeaturesActive",
      },
    ],
    userLangKey: "userLang",
    userGeoKey: "userGeo",
    userWeatherDataKey: "userWeather",
  },
  FIREBASE_CONFIG: {
    apiKey: "*******************",
    authDomain: "*******************",
    projectId: "*******************",
    storageBucket: "*******************",
    messagingSenderId: "*******************",
    appId: "*******************",
    measurementId: "*******************",
    db: "*******************",
  },
};
