
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