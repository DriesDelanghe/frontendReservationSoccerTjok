const overviewPageFromCookies = () => {
    const objectList = valuesFromCookies();
    const parentDiv = document.getElementById(`reservationContainer`);
    if (objectList) {
        objectList.forEach(object => {
            const parent = createContainerDiv();
            const date = new Date(object.creationDate);
            parent.appendChild(constructHeader(`Je reservatie van ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} om ${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`));
            parent.appendChild(constructPersons(object.firstNames, object.lastNames));
            parent.appendChild(constructDates(object.reservation));
            if (object.emailConfirmation === `true`) {
                parent.appendChild(constructEmail(object.email))
            }
            parent.prepend(createEditButtons(object))
            parentDiv.appendChild(parent);
            parentDiv.appendChild(createRemoveModal(`Verwijderen van je bestelling geplaatst op ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} om ${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`,
                `Zeker dat je deze bestelling wilt verwijderen? <br> <span class="fw-bold">Deze actie is permanent</span>`, object));
        });
        return
    }
    const div = document.createElement(`div`);
    div.className = `container mx-auto`
    const h2 = document.createElement(`h2`);
    h2.className = `display-6 fs-4 mt-5`;
    h2.innerHTML = `Je hebt nog geen bestellingen geplaatst`;
    div.appendChild(h2);
    const p = document.createElement(`p`);
    p.className = `lead fs-5 text-muted m-0`;
    p.innerHTML = `Hou er rekening mee dat bestellingen alleen kunnen gezien worden op het device waarmee ze geplaatst zijn`;
    div.appendChild(p);
    parentDiv.appendChild(div)
    return
}

const createRemoveForm = (object) => {
    const form = document.createElement(`form`);
    form.method = `post`;
    form.action = `/admin/reservation/remove/${object.id}`;
    form.id = `reservationForm${object.id}`
    const removeInput = document.createElement(`input`);
    removeInput.type = `submit`;
    removeInput.className = `btn btn-danger`;
    removeInput.value = `verwijderen`;
    form.appendChild(removeInput);
    form.addEventListener(`submit`, (event) => removeCookie(event, object));
    return form;
}

const removeCookie = (event, object) => {
    event.preventDefault();
    document.cookie = `${object.cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
    document.getElementById(`reservationForm${object.id}`).submit();
}

const createRemoveModal = (title, text, object) => {
    const modal = document.createElement(`div`);
    modal.className = `modal fade`;
    modal.id = `modal${object.id}`;
    modal.tabIndex = -1;
    modal.setAttribute(`aria-labelledby`, `modalLabel${object.id}`);
    modal.ariaHidden = `true`;
    const modalDialog = document.createElement(`div`);
    modalDialog.className = `modal-dialog`;
    const modalContent = document.createElement(`div`);
    modalContent.className = `modal-content`;
    const modalHeader = document.createElement(`modal-header`);
    modalHeader.className = `modal-header`;

    const modalTitle = document.createElement(`h5`);
    modalTitle.className = `modal-title`;
    modalTitle.innerHTML = title;
    modalTitle.id = `modalLabel${object.id}`
    modalHeader.appendChild(modalTitle);

    const btnClose = document.createElement(`button`);
    btnClose.className = `btn-close`;
    btnClose.type = `button`;
    btnClose.dataset.bsDismiss = `modal`;
    btnClose.ariaLabel = `Close`;
    modalHeader.appendChild(btnClose);
    modalContent.appendChild(modalHeader);

    const modalBody = document.createElement(`div`);
    const container = document.createElement(`div`);
    container.className = `container mx-auto p-2 text-center`;
    const p = document.createElement(`p`);
    p.className = `lead`;
    p.innerHTML = text;
    container.appendChild(p);
    modalBody.appendChild(container);
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement(`div`);
    modalFooter.className = `modal-footer`;
    const closeButton = document.createElement(`button`);
    closeButton.type = `button`;
    closeButton.className = `btn btn-secondary`
    closeButton.dataset.bsDismiss = `modal`;
    closeButton.innerHTML = `Sluiten`;
    modalFooter.appendChild(closeButton);
    modalFooter.appendChild(createRemoveForm(object))
    modalContent.appendChild(modalFooter);

    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    return modal;
}

const createEditButtons = (object) => {
    const div = document.createElement(`div`);
    div.className = `container-fluid mx-0 d-flex justify-content-end`;
    const updateLink = document.createElement(`btn`);
    updateLink.type = `button`;
    updateLink.className = `btn btn-dark p-2 mx-3`;
    updateLink.onclick = () => window.location.href = `/tjokregisterpage/registerpage.html?${object.cookieName}`;
    const editIcon = document.createElement(`i`);
    editIcon.className = `fas fa-edit`;
    updateLink.appendChild(editIcon);
    const removeButton = document.createElement(`button`);
    removeButton.type = `button`;
    removeButton.className = `btn btn-danger`;
    removeButton.dataset.bsToggle = `modal`;
    removeButton.dataset.bsTarget = `#modal${object.id}`
    const icon = document.createElement(`i`);
    icon.className = `fas fa-times`;
    removeButton.appendChild(icon);
    div.appendChild(updateLink);
    div.appendChild(removeButton);
    return div;
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
        firstNames.forEach((firstName, index) => parentDiv.appendChild(personParaph(firstName, lastNames[index])));
    } else {
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
    if (dates.length > 1) {
        dates.forEach(date => parentDiv.appendChild(dateParaph(date)))
    } else {
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