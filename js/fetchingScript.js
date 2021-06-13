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
        if (xhr.status >= 400 && xhr.status < 600){
            const div = createErrorMessage(`Something went wrong, please try again`);
            if (div) {
                document.getElementById(`errorDiv`).appendChild(div);
            }
        }
    };

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(data));
}

const createErrorMessage = (text) => {
    const errorDiv = document.getElementById(`serverErrorMessage`)
    if (errorDiv){
        return null;
    }
    const div = document.createElement(`div`);
    div.id = `serverErrorMessage`
    div.className = `alert alert-danger d-flex justify-content-between flex-nowrap position-fixed w-100`;
    div.style.zIndex = `1024`;
    const p = document.createElement(`p`);
    p.className = `m-1 lead`;
    p.innerHTML = text;
    const button = document.createElement(`button`);
    button.className = `btn-close`;
    button.onclick = () => div.remove();
    div.appendChild(p);
    div.appendChild(button);
    return div;
}