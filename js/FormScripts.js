
const validateForm = (event) => {
    event.preventDefault();
    const table = document.getElementById(`dateTable`);
    const checkboxes = table.getElementsByTagName(`input`);
    let lookingGood = false;

    const nameContainer = document.getElementById(`nameContainer`);
    const nameValues = nameContainer.getElementsByTagName(`input`);

    Array.from(checkboxes).forEach(checkbox => {
        if (checkbox.checked === true) lookingGood = true;
    })

    let namesLookGood = true;

    Array.from(nameValues).forEach(nameInput => {
        if (!nameInput.value) {
            nameInput.classList.add(`alert-danger`);
            namesLookGood = false;
            return;
        }
        nameInput.classList.remove(`alert-danger`);
    })

    let emailLooksGood = false;
    const emailInput = document.getElementById(`emailConfirmation`).checked;
    if (!emailInput){
        emailLooksGood = true;
    }

    const regex = /\S+@\S+\.\S+/;
    const email = document.getElementById(`email`)
    if (emailInput && (email.value && regex.test(email.value)) ){
        emailLooksGood = true;
    }


    const nameErrorDiv = document.getElementById(`nameError`);
    const dateErrorDiv = document.getElementById(`dateError`);
    const emailErrorDiv = document.getElementById(`emailError`);

    if (!namesLookGood && !nameErrorDiv) {
        const nameContainerParent = document.getElementById(`nameContainerParent`);
        nameContainerParent.prepend(notLookingGoodMessage(`Alle naam velden moeten ingevuld zijn`, `nameError`));
    }

    if (namesLookGood && nameErrorDiv) {
        nameErrorDiv.remove();
    }

    if (!lookingGood && !dateErrorDiv) {
        const calendarDiv = document.getElementById(`calenderDiv`);
        calendarDiv.prepend(notLookingGoodMessage(`Er moet minstens 1 datum geselecteerd zijn.`, `dateError`));
    }

    if (lookingGood && dateErrorDiv) {
        dateErrorDiv.remove();
    }

    if(!emailLooksGood && !emailErrorDiv){
        const emailDiv = document.getElementById(`emailContainer`);
        emailDiv.prepend(notLookingGoodMessage(`Geef een geldige email op`, `emailError`))
    }

    if(emailLooksGood && emailErrorDiv){
        emailErrorDiv.remove();
    }

    if (!lookingGood || !namesLookGood) {
        return;
    } else {
        valuesFormToCookie(form);
        localStorage.removeItem(`email`);
        document.querySelector(`form`).submit();
    }
}

const notLookingGoodMessage = (text, id) => {
    const message = text || `Gelieve alle velden in te vullen`;
    const div = document.createElement(`div`);
    div.className = `alert alert-danger`;
    const span = document.createElement(`span`);
    span.innerHTML = message;
    div.appendChild(span);
    div.id = id;
    return div;
}

const removeErrorStyleName = (id) => {
    const elem = document.getElementById(id);
    elem.classList.remove(`alert-danger`);
}


let form = document.querySelector(`form`);
form.addEventListener(`submit`, event => validateForm(event));
