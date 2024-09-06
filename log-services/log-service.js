import chalk from "chalk";
import dedent from 'dedent-js'
import { getIcon } from "../api-service/api.service.js";
import moment from 'moment-timezone';


const getLocalDateTime = (dt, timezone) => {
    
    const dateTime = new Date(dt * 1000 + timezone * 1000)
    
    const localDate = moment.tz(dateTime, "UTC").format("DD.MM.yyyy");
    const localTime = moment.tz(dateTime, "UTC").format("HH:MM");

    return {localDate, localTime}
    
}



const printError = (error) => {  
    console.log(`${chalk.bgRed( 'ОШИБКА' )}\n${error}`)
};

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen( 'УСПЕШНО' )}\n${message}`)
};

const printHelp = () => {
     console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        Без параметров : вывод погоды;
                    -s : [CITY...] для установки города(-ов);
                    -h : для вывода города;
                    -t : [API_KEY] для сохранения токена;
                    -l : для сохранения языковых настроек (ext. ru)`
        )

};

const printWeather = (weather) => {
    const icon = getIcon(weather.weather[0].icon);
    const city = weather.name;
    const dateTime = getLocalDateTime(weather.dt, weather.timezone) 
    let desc = weather.weather[0].description.toString();
    desc = `${desc.charAt(0).toUpperCase()}${desc.slice(1)}`
    const temp = `${Math.round(weather.main.temp)}°`;
    const maxTemp = `${Math.round(weather.main.temp_max)}°`;
    const minTemp = `${Math.round(weather.main.temp_min)}°`;
    const humidity = `💧 ${weather.main.humidity}%`;
    const wind = `🚩 ${weather.wind.speed} м/с`

   
    
    
    console.log(
        dedent`
         ${city}. ${icon}

         Метеоданные по местному времени - ${dateTime.localDate}, ${dateTime.localTime}:
         Температура в течение дня ${temp}. ${desc}.

         ${chalk.bgRedBright(maxTemp)} ${chalk.bgBlueBright(minTemp)} | ${humidity} | ${wind}
         ________________________________________________________________________________________

         `)
}

export {printError, printSuccess, printHelp, printWeather}