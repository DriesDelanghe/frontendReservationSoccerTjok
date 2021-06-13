const renderRegisterPage = () => {
    constructCalendar();
    const param = getParams(window.location.href);
    if (param && param.includes(`reservation`)) {
        const cookieList = valuesFromCookies();
        if (!cookieList.find(cookie => cookie.cookieName === param)) return;
        const cookie = cookieList.find(cookie => cookie.cookieName === param);

        document.getElementById(`firstName1`).value = cookie.firstNames[0];
        document.getElementById(`lastName1`).value  = cookie.lastNames[0];
        if (cookie.firstNames.length > 1) cookie.firstNames.forEach((value, index) => addName(value, cookie.lastNames[index]));

        const checkboxes = document.getElementById(`calenderDiv`).getElementsByTagName(`input`);
        Array.from(checkboxes).forEach(checkbox => {
            if (cookie.reservation.find(dateString => {
                console.log(new Date(dateString), `=?`, new Date(checkbox.value), new Date(dateString) === new Date(checkbox.value));
                return new Date(dateString).getTime() === new Date(checkbox.value).getTime()
            })) {
                console.log(`found date`)
                checkbox.checked = true;
                updateSelectedData(SOCCERDATES.find(object => new Date(object.date) === new Date(checkbox.value)))
            }
        })

        if (cookie.emailConfirmation === `true`) {
            document.getElementById(`emailConfirmation`).checked = true;
            onConfirmation(cookie.email);
        }

        document.querySelector(`form`).action = `/admin/reservation/update/${cookie.id}`;

        return;
    }
}

const getParams = (url) => {
        const paramString = url.split(`?`)[1];
        if (paramString){
            return paramString;
        }
        return null;
}