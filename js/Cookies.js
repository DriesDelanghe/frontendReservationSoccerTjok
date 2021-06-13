const createCookie = (cookieName, valueObject) => {
    let date = new Date(`2021-07-12`);
    document.cookie = `${cookieName}=${JSON.stringify(valueObject)}; expires=${date.toUTCString()}`;
}

const createReservationObject = (firstNames, lastNames, reservation, emailConfirmation, email, cookieName) => {
    const object = {};

    // placeholder id generator, replace this in production enviroment
    const cookies = document.cookie.split(`;`)
    object.id = valueFromCookie(cookies[cookies.length - 1]).id + 1 || 1;

    object.firstNames = firstNames;
    object.lastNames = lastNames;
    object.reservation = reservation;
    object.emailConfirmation = emailConfirmation;
    object.email = email;
    object.cookieName = cookieName;
    object.creationDate = new Date();
    return object;
}

const valuesFormToCookie = (form, cookieNameParam) => {
    const reservationDates = [];
    const firstNames = [];
    const lastNames = [];
    form.elements.reservation.forEach(checkbox => {
        if (checkbox.checked) reservationDates.push(checkbox.value);
    });
    if (form.elements.firstName.length > 1) {
        form.elements.firstName.forEach(string => firstNames.push(string.value));
        form.elements.lastName.forEach(string => lastNames.push(string.value));
    } else {
        firstNames.push(form.elements.firstName.value);
        lastNames.push(form.elements.lastName.value);
    }

    const date = new Date()
    const hour = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());
    const cookieName = cookieNameParam || `reservation${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${hour}${minutes}${seconds}`
    createCookie(cookieName, createReservationObject(firstNames, lastNames, reservationDates, form.elements.emailConfirmation.value, form.elements.email.value || ``, cookieName))
}

const formatTime = (time) => {
    if (time < 10) {
        return `0${time}`;
    }
    return time;
}

const valuesFromCookies = () => {
    const reservationCookies = document.cookie.split(`;`).filter(string => string.includes(`reservation`));
    if (reservationCookies.length !== 0) {
        const objectList = [];
        reservationCookies.forEach(string => objectList.push(JSON.parse(string.split(`=`)[1])))
        return objectList;
    }
    return null;
}

const valueFromCookie = (cookieString) => {
     if (cookieString.split(`=`)[1])
    return JSON.parse(cookieString.split(`=`)[1]);
     return {};
}

