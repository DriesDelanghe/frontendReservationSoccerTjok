const createJSONdata = (form, cookieNameParam) => {
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
    const email = form.elements.email ? form.elements.email.value : ``;
    const confirmation = !!form.elements.emailConfirmation;

    return createReservationObject(firstNames, lastNames, reservationDates, confirmation, email, cookieName);
}

const sendFormDataToServer = (url, data) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300){
            const response = JSON.parse(xhr.responseText);
            console.log(response)
        }
    };

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}