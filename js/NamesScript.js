const addName = (firstName, lastName) => {
    const parent = document.getElementById(`nameContainer`);
    const count = parent.getElementsByTagName(`label`).length + 1;

    const div = document.createElement(`div`);
    div.className = `row w-100`;
    div.id = `containerName${count}`;

    const label = document.createElement(`label`);
    label.classList.add(`p-0`, `form-label`, `col-12`, `col-md-8`, `col-lg-7`, `m-1`, `row`);
    label.htmlFor = `name${count}`;

    const span = document.createElement(`span`);
    span.innerHTML = `Persoon ${count}:`;

    const inputGroup = document.createElement(`div`);
    inputGroup.className = `input-group p-0`;

    const inputFirstName = document.createElement(`input`);
    inputFirstName.type = `text`;
    inputFirstName.name = `firstName`;
    inputFirstName.id = `firstName${count}`;
    inputFirstName.className = `form-control`;
    inputFirstName.placeholder = `Voornaam`;
    if (firstName){
        inputFirstName.value = firstName;
    }
    inputFirstName.addEventListener(`click`, () => removeErrorStyleName(inputFirstName.id))
    inputGroup.appendChild(inputFirstName);

    const inputLastName = document.createElement(`input`);
    inputLastName.type = `text`;
    inputLastName.name = `lastName`;
    inputLastName.id = `lastName${count}`;
    inputLastName.className = `form-control`;
    inputLastName.placeholder = `Achternaam`;
    if (lastName) {
        inputLastName.value = lastName;
    }
    inputLastName.addEventListener(`click`, () => removeErrorStyleName(inputLastName.id))
    inputGroup.appendChild(inputLastName);

    const button = document.createElement(`button`);
    button.classList.add(`btn`, `col-1`);
    button.type = `button`;
    button.onclick = () => removeButton(div.id);

    const icon = document.createElement(`i`);
    icon.classList.add(`fas`, `fa-times`);
    button.appendChild(icon);
    inputGroup.appendChild(button)

    label.appendChild(span);
    label.appendChild(inputGroup);

    div.appendChild(label);
    parent.appendChild(div);
}

const removeButton = (id) => {
    const divList = document.querySelectorAll(`[id^="containerName"]`);
    if (divList.length > 1) {
        const selectedDiv = document.getElementById(id);
        selectedDiv.remove();
        const count = Number(id.replace(`containerName`, ``));
        divList.forEach(div => {
            const divNumber = Number(div.id.replace(`containerName`, ``));
            if (count < divNumber) {
                div.id = `containerName${divNumber - 1}`;
                const span = div.getElementsByTagName(`span`)[0];
                span.innerHTML = `Persoon ${divNumber - 1}:`;
                const label = div.getElementsByTagName(`label`)[0];
                label.htmlFor = `name${divNumber - 1}`;
                const input = div.getElementsByTagName(`input`)[0];
                input.id = label.htmlFor;
                const button = div.getElementsByTagName(`button`)[0];
                button.onclick = () => removeButton(div.id);
            }
        });
    }
}


