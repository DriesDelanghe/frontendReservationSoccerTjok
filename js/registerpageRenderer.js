const renderRegisterPage = () => {
    constructCalendar();
    const param = getParams(window.location.href);
    param ? console.log(`params are here`) : console.log(`no params here`);
    if (param) {
        const cookieList = valuesFromCookies();
        if (!cookieList.find(cookie => cookie.cookieName === param)) return;
        const cookie = cookieList.find(cookie => cookie.cookieName === param);

        document.getElementById(`firstName1`).value = cookie.firstNames[0];
        document.getElementById(`lastName1`).value  = cookie.lastNames[0];
        if (cookie.firstNames.length > 1) cookie.firstNames.forEach((value, index) => addName(value, cookie.lastNames[index]));

        return;
    }
}

const getParams = (url) => {
        const paramString = url.split(`?`)[1];
        if (paramString){
            return paramString;
        }
        return null;
}