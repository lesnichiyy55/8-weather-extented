
import axios from "axios";
import { TOKEN_DICTIONARY, getKeyValue } from "../saveargs/saveargs.js";
import { printWeather } from "../log-services/log-service.js";


const getIcon = (icon) => {

    switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};


const getData = async (c, token, lang) => {

    const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: c,
            appid: token,
            lang: lang,
            units: 'metric'
        }
    });

    printWeather(data, lang);
}


const getWeather = async() => {
    
    let {token, city, lang} = await getKeyValue(TOKEN_DICTIONARY);

    if(!token) {
        throw new Error('Не задан ключ API. Создайте его командой -t[API_KEY]');
    }  else if(!city) {
        throw new Error('Не задан город(-а). Создайте список командой -s[CITY]');
    } else if (!lang) {
        lang = 'en'
    }
    

    city.forEach(c => {
        return getData(c, token[0], lang.toString())
    })
}




export {getWeather, getIcon}