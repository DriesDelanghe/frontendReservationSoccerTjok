const saveToLocalStorage = (form) => {
    const reservationDates = [];
    const firstNames = [];
    const lastNames = [];
    form.elements.reservation.forEach(checkbox => {
        if(checkbox.checked) reservationDates.push(checkbox.value);
    });
    form.elements.firstName.forEach(string => firstNames.push(string.value));
    form.elements.lastName.forEach(string => lastNames.push(string.value));

    localStorage.setItem(`firstName`, firstNames.toString());
    localStorage.setItem(`lastName`, lastNames.toString());
    localStorage.setItem(`reservation`, reservationDates.toString());
    localStorage.setItem(`emailConfirmation`, `${form.elements.emailConfirmation ? "true" : "false"}`);
    localStorage.setItem(`email`, form.elements.email ? form.elements.email.value : ``);
}


const fillInPageFromLocalStorage = () => {
    const reservation = convertStringToArray(localStorage.getItem(`reservation`));
    const firstNames = convertStringToArray(localStorage.getItem(`firstName`));
    const lastNames = convertStringToArray(localStorage.getItem(`lastName`));
    const emailConfirmation = localStorage.getItem(`emailConfirmation`);
    const email = localStorage.getItem(`email`);

    localStorage.clear()

    if (firstNames && lastNames) {
        document.getElementById(`firstName1`).value = firstNames[0];
        document.getElementById(`lastName1`).value = lastNames[0];

        if (firstNames.length > 1) {
            const extraFirstNames = [...firstNames];
            extraFirstNames.splice(0, 1);
            const extraLastNames = [...lastNames];
            extraLastNames.splice(0, 1);
            extraFirstNames.forEach(firstName => addName(firstName, extraLastNames[extraFirstNames.indexOf(firstName)]))
        }
    }
    constructCalendar();

    if (reservation) {
        const table = document.getElementById(`dateTable`);
        const checkboxes = table.getElementsByTagName(`input`);

        Array.from(checkboxes).forEach(input => {
            if (reservation.indexOf(input.value) >= 0) {
                input.checked = true;
                const id = input.dateReference;
                const object = getDateObjectById(id);
                updateSelectedData(object);
            }
        })
    }

    if (emailConfirmation){
        onConfirmation();
    }
}

const convertStringToArray = (string) => {
    if (string) {
        return string.split(`,`);
    }
    return null;
}