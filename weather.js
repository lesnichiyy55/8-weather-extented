import { getWeather } from './api-service/api.service.js'
import { getArgs } from './heplers/args.js'
import { printHelp, printError } from './log-services/log-service.js';
import {saveToken, saveCity, saveLanguage} from './saveargs/saveargs.js'


const initCLI = () => {
    const args = getArgs(process.argv);   

    if(args.t) {
        return saveToken(args.t)
    }

    if(args.s) {
        return saveCity(args.s)
    }    

    if(args.h) {
        printHelp();
    }

    if(args.l) {
        saveLanguage(args.l);
    }

    getForcast();
    
}

const getForcast = async () => {

    try {
        await getWeather();
     } catch (error) {
 
         switch(error?.response?.status) {
             case 404:
                 printError('Неверно указан город');
             break;
 
             case 401:
                 printError('Неверно указан токен');
             break;
             default:
                 printError(error.message);
         }    
     }
 }

initCLI();