import * as resources_tr_TR from './resources.json'
import * as resources_en_US from './resources.en-US.json'

import { store } from '../../event/src/index'

const initResources = () => {
    return {
        "tr-TR": resources_tr_TR, 
        "en-US": resources_en_US
    }
}

const resources = initResources();

export const l = (culture, key) => {
    const value = resources[culture || 'tr-TR'][key];
    return value || key;
}