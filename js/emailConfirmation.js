const onConfirmation = () => {
    const emailContainer = document.getElementById(`extraInfo`);

    if (emailContainer.innerHTML == ``) {

        const emailInput = document.createElement(`input`);
        emailInput.type = `text`;
        emailInput.id = `email`;
        emailInput.className = `form-control`
        emailInput.placeholder = `someone@example.com`
        emailInput.name = `email`;
        if (localStorage.getItem(`email`)){
            emailInput.value = localStorage.getItem(`email`);
        }
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
        console.log(`saving in local storage`)
    if (emailInput) {
        localStorage.setItem(`email`, emailInput.value);
    }
}