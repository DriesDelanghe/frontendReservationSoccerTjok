const selectedData = [];

const constructCalendar = () => {
    const table = document.getElementById(`dateTable`);

    const dateToday = new Date();
    let referenceDate = new Date();
    referenceDate.setHours(2, 0, 0, 0);
    (dateToday.getDay() > 0) ? referenceDate.setDate(dateToday.getDate() - dateToday.getDay()) : referenceDate.setDate(dateToday.getDate());

    let tableRow = document.createElement(`tr`);
    tableRow.className = `text-end`;
    let i = 0;
    while (referenceDate.getTime() <= SOCCERDATES[SOCCERDATES.length - 1].date.getTime()) {
        if (i > 6) {
            table.appendChild(tableRow);
            tableRow = document.createElement(`tr`);
            tableRow.className = `text-end`;
            i = 0;
        }
        if (!!SOCCERDATES.find(object => {
            return referenceDate.getTime() === object.date.getTime()
        }) && referenceDate >= dateToday) {
            const object = SOCCERDATES.find(object => {
                return referenceDate.getTime() === object.date.getTime()
            });
            
            tableRow.appendChild(createTableDataDate(referenceDate, object, true));
        } else {
            const tableData = createTableDataDate(null, null, false);
            if (referenceDate >= dateToday) {
                tableData.appendChild(createDateDiv(referenceDate));
            }
            tableRow.appendChild(tableData);
        }
        i++;
        referenceDate.setDate(referenceDate.getDate() + 1);
    }

    table.appendChild(tableRow);
}

const getDateObjectById = (id) => {
    return SOCCERDATES.find(object => {
        return object.id == id;
    });
}

const createTableDataDate = (referenceDate, object, clickable) => {
    const tableData = document.createElement(`td`);
    tableData.className = `p-0 border`;
    if (clickable) {
        const label = document.createElement(`label`);
        label.htmlFor = `${referenceDate.getDate()}${MONTHS[referenceDate.getMonth()]}`;
        label.classList.add(`w-100`, `h-100`, `p-0`);

        const input = document.createElement(`input`);
        input.type = `checkbox`;
        input.id = label.htmlFor;
        input.name = `reservation`;
        input.value = `${referenceDate.getFullYear()}-${referenceDate.getMonth()+1}-${referenceDate.getDate()}`;
        input.dateReference = object.id;
        input.addEventListener(`change`, () => updateSelectedData(object))
        label.appendChild(input);

        label.appendChild(createDateDiv(referenceDate));
        tableData.appendChild(label);
        return tableData;
    }
    tableData.classList.add(`text-muted`, `bg-light`, `p-0`);
    return tableData;

}

const createDateDiv = (referenceDate) => {
    const div = document.createElement(`div`);
    div.classList.add(`date`, `p-2`);
    const span = document.createElement(`span`);
    span.innerHTML = `${referenceDate.getDate()} <br> ${MONTHS[referenceDate.getMonth()]}`
    div.appendChild(span);
    return div;
}

const updateSelectedData = (object) => {
    (selectedData.indexOf(object) === -1) ? selectedData.push(object) : selectedData.splice(selectedData.indexOf(object), 1);
    const parentDiv = document.getElementById(`selectedData`);
    parentDiv.innerHTML = ``;
    if (selectedData[0]) {
        const h2 = document.createElement(`h2`);
        h2.className = `display-6 mt-3`;
        h2.innerHTML = `Je geselecteerde data:`;
        parentDiv.appendChild(h2);
        selectedData.sort((a, b) => a.date - b.date);
        selectedData.forEach(object => parentDiv.append(constructParagraph(object)));
    }
}

const constructParagraph = (object) => {
    const paraph = document.createElement(`p`);
    paraph.className = `fw-light my-1 mx-0`;
    paraph.id = `selectedData${object.id}`;
    paraph.innerHTML = `${object.date.getDate()} ${MONTHS[object.date.getMonth()]} <br> Openingsuren: ${object.open} - ${object.closed}`;
    return paraph;
}

