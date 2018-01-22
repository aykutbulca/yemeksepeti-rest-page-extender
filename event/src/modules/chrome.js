import ChromePromise from 'chrome-promise';
import { globalsRetrieved } from '../../../shared/actions'

const TOKEN_COOKIE_NAME = 'loginToken';
const CATALOG_COOKIE_NAME = 'catalogName';
const CULTURE_COOKIE_NAME = 'culture';

const chromep = new ChromePromise();

export const getYemeksepetiGlobals = async (dispatch) => {
    const token = await getCookie(TOKEN_COOKIE_NAME);
    const catalog = await getCookie(CATALOG_COOKIE_NAME);
    const culture = await getCookie(CULTURE_COOKIE_NAME);
    
    const globals = {token, catalog, culture};
    dispatch(globalsRetrieved(globals));
    
    return globals;
}

const getCookie = async (cookieName) => {
    try {
        const cookie = await chromep.cookies.get({ 
            url: 'https://www.yemeksepeti.com', 
            name: cookieName 
        });

        if(cookie) {
            return cookie.value;
        }
    } catch(err) {
        console.log("GetCookie Error", err);
    }

    return '';
}

export const getFromStorage = async (key) => {
    const storageItem = await chromep.storage.local.get(key);
    const itemFound = storageItem && storageItem[key];

    if(itemFound && storageItem[key].expireTime >= new Date().getTime()) {
        return storageItem[key].data;
    }

    if(itemFound) {
        await removeFromStorage(key);
    }

    return null;
}

export const saveToStorage = async (key, data) => {
    let expireTime = new Date(); 
    expireTime.setMinutes(expireTime.getMinutes() + (60 * 4));

    const storageItem = { [key]: {data, expireTime: expireTime.getTime()} };

    await chromep.storage.local.set(storageItem);
}

export const removeFromStorage = async (key) => {
    await chromep.storage.local.remove(key);
}