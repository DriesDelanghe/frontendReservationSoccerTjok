const createCookie = (cookieName, valueObject) => {
    let date = new Date();
    date.setMonth(date.getMonth()+1);
    console.log(date);
    document.cookie = `${cookieName}=${JSON.stringify(valueObject)}; expires=${date.toUTCString()}`;
}

const createReservationObject = (firstNames, lastNames, reservation, emailConfirmation, email, cookieName) => {
    const object = {};
    object.id = ``;
    object.firstNames = firstNames;
    object.lastNames = lastNames;
    object.reservation = reservation;
    object.emailConfirmation = emailConfirmation;
    object.email = email;
    object.cookieName = cookieName;
    return object;
}

const valuesFormToCookie = (form) => {
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
    const cookieName = `reservation${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}|${date.getHours()}:${date.getMinutes()}`
    createCookie(cookieName, createReservationObject(firstNames, lastNames, reservationDates, form.elements.emailConfirmation.value, form.elements.email.value, cookieName))
}

const valuesFromCookies = () => {
    const reservationCookies = document.cookie.split(`;`).filter(string => string.includes(`reservation`));
    const objectList = [];
    reservationCookies.forEach(string => objectList.push(JSON.parse(string.split(`=`)[1])))
    console.log(`I do get called`);
    console.log(objectList);
}