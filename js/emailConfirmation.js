const onConfirmation = (email) => {
    const emailContainer = document.getElementById(`extraInfo`);

    if (emailContainer.innerHTML == ``) {

        const emailInput = document.createElement(`input`);
        emailInput.type = `text`;
        emailInput.id = `email`;
        emailInput.className = `form-control`
        emailInput.placeholder = `someone@example.com`
        emailInput.name = `email`;
        emailInput.value = email || localStorage.getItem(`email`) || ``;
        emailInput.addEventListener(`input`, () => saveEmail());

        const label = document.createElement(`label`);
        label.htmlFor = emailInput.id;
        label.className = `form-label  col-10 col-md-6 mt-3`;
        label.appendChild(emailInput);

        emailContainer.appendChild(label);
        return;
    }

    emailContainer.innerHTML = ``;
}

const saveEmail = () => {
    const emailInput = document.getElementById(`email`);
    if (emailInput) {
        localStorage.setItem(`email`, emailInput.value);
    }
}