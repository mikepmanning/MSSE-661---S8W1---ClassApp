const setStorage = (key, data) => {
    const dataAsString = JSON.stringify(data);
    const encodedData = btoa(dataAsString);
    localStorage.setItem(key, encodedData);
};

const getStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value != null) {
        const decodedData = atob(value);
        console.log(decodedData);
        return JSON.parse(decodedData);
    }
    else {
        return '';
    }
};

const clearStorage = (key) => {
    localStorage.removeItem(key);
};

const storageHasData = () => { 
    if (localStorage.length > 0) {
        return true;
    }
    else {
        return false;
    }
};