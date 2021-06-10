const fillInDataFromLocalStorage = () => {
    const reservation = convertStringToArray(localStorage.getItem(`reservation`));
    const firstNames = convertStringToArray(localStorage.getItem(`firstName`));
    const lastNames = convertStringToArray(localStorage.getItem(`lastName`));
    const emailConfirmation = localStorage.getItem(`emailConfirmation`);
    const email = localStorage.getItem(`email`);

    const parentDiv = document.getElementById(`reservationDiv`);

    parentDiv.appendChild(constructPersons(firstNames, lastNames));
    parentDiv.appendChild(constructDates(reservation));

    if (emailConfirmation === `true`){
        parentDiv.appendChild(constructEmail(email));
    }

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
        console.log(date)
        const dateDate = new Date(date);
        dateDate.setHours(2);
        return dateDate.getTime() === object.date.getTime()
    });
    const paraph = document.createElement(`p`);
    paraph.className = `m-1 ms-3`;
    paraph.innerHTML = `${object.date.getDate()} ${MONTHS[object.date.getMonth()]} <br> Openingsuren: ${object.open} - ${object.closed}`;
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

const convertStringToArray = (string) => {
    if (string) {
        return string.split(`,`);
    }
    return null;
}