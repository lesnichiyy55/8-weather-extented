import {homedir} from 'os'
import {join} from 'path'
import {promises} from 'fs'
import { printError, printSuccess } from '../log-services/log-service.js';



const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    lang: 'lang'
}

const saveKeyValue = async (key, value) => {
    let data = {};

    if(await isExist(filePath)) {
       const file = await promises.readFile(filePath);
       data = JSON.parse(file);
    }

    data[key] = value;

    console.log(data)

    await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (data) => {
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        
        return data
     } return undefined
}

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true
  } catch (error) {
    return false
  }
}

const saveToken = async (token) => {    

    if(!token.length) {
        printError("Не передан токен")
        return
    } 
      try {
         await saveKeyValue(TOKEN_DICTIONARY.token, token);
         printSuccess('Токен сохранен');
     } catch (error) {
        printError(error.message)
     }
}

const saveCity = async (city) => {

    if(!city.length) {
        printError("Не указан город")
        return
    }
     try {
         await saveKeyValue(TOKEN_DICTIONARY.city, city);
         printSuccess('Город(-а) сохранен(-ы)');
     } catch (error) {
        printError(error.message)
     }
}

const saveLanguage = async (lang) => {

    if(!lang.length) {
        printError("Нет языковых настроек")
        return
    } 
      try {
         await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
         printSuccess('Языковые настройки сохранены');
     } catch (error) {
        printError(error.message)
     }
}

export {saveKeyValue, getKeyValue, saveToken, saveCity, saveLanguage, TOKEN_DICTIONARY};