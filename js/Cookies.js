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
    const cookieName = `reservation${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}|${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()} `
    createCookie(cookieName, createReservationObject(firstNames, lastNames, reservationDates, form.elements.emailConfirmation.value, form.elements.email.value, cookieName))
}

const valuesFromCookies = () => {
    const reservationCookies = document.cookie.split(`;`).filter(string => string.includes(`reservation`));
    const objectList = [];
    reservationCookies.forEach(string => objectList.push(JSON.parse(string.split(`=`)[1])))
    return objectList;
}

const overviewPageFromCookies = () => {
    const objectList = valuesFromCookies();
    const parentDiv = document.getElementById(`reservationContainer`);
    objectList.forEach(object => {
        const parent = createContainerDiv();
        const dateParts = object.cookieName.replace(`reservation`, ``).split(`|`);
        parent.appendChild(constructHeader(`Je reservatie van ${dateParts[0]} om ${dateParts[1]}`));
        parent.appendChild(constructPersons(object.firstNames, object.lastNames));
        parent.appendChild(constructDates(object.reservation));
        if (object.emailConfirmation === `true`){
            parent.appendChild(constructEmail(object.email))
        }
        parentDiv.appendChild(parent);
    })

}

const createContainerDiv = () => {
    const div = document.createElement(`div`);
    div.className = `container-fluid col-10 col-md-6 mx-auto border shadow-sm my-5 p-3`;
    return div;
}

const constructPersons = (firstNames, lastNames) => {
    const parentDiv = document.createElement(`div`);

    if (firstNames.length > 1) {
        parentDiv.appendChild(constructHeader(`Personen:`))
        firstNames.forEach((firstName, index) => parentDiv.appendChild(personParaph(firstName, lastNames[index] )) );
    }else{
        parentDiv.appendChild(constructHeader(`Persoon:`))
        parentDiv.appendChild(personParaph(firstNames, lastNames));
    }
    return parentDiv;
}

const constructHeader = (text) => {
    const h2 = document.createElement(`h2`);
    h2.className = `display-6 fs-5 mt-3`;
    h2.innerHTML = text;
    return h2;
}

const personParaph = (firstName, lastName) => {
    const p = document.createElement(`p`);
    p.className = `m-1 ms-3`;
    p.innerHTML = `${firstName} ${lastName}`;
    return p;
}

const constructDates = (dates) => {
    const parentDiv = document.createElement(`div`)
    parentDiv.appendChild(constructHeader(`Reservaties voor:`))
    if (dates.length > 1){
        dates.forEach(date => parentDiv.appendChild(dateParaph(date)))
    }else{
        parentDiv.appendChild(dateParaph(dates));
    }
    return parentDiv;
}

const dateParaph = (date) => {
    const object = SOCCERDATES.find(object => {
        const dateDate = new Date(date);
        dateDate.setHours(2);
        return dateDate.getTime() === object.date.getTime()
    });
    const paraph = document.createElement(`p`);
    paraph.className = `m-1 ms-3 mt-2`;
    paraph.innerHTML = `${object.date.getDate()} ${MONTHS[object.date.getMonth()]} <br>`;
    const span = document.createElement(`span`);
    span.className = `fw-light`;
    span.innerHTML = `Openingsuren: ${object.open} - ${object.closed}`;
    paraph.appendChild(span);
    return paraph;
}

const constructEmail = (email) => {
    const parentDiv = document.createElement(`div`);
    parentDiv.appendChild(constructHeader(`Je email:`));

    const p = document.createElement(`p`);
    p.className = `m-1 ms-3`;
    p.innerHTML = email;

    parentDiv.appendChild(p);
    return parentDiv;
}