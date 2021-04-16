let formatNode = document.getElementById("regFormat"), regButton = document.getElementById("button-reg"),
    currentID, oldID, arr, password, validationReg = Array(4).fill(false);

[...document.getElementsByClassName("input-text")].forEach((input) => {
    input.onfocus = ((element) => {
        currentID = input.getAttribute("id");
        if (currentID != oldID) {
            displayFormat();
            oldID = currentID;
        }
        updateFormat(element.target.value);
    })
    input.oninput = ((element) => {
        updateFormat(element.target.value);
    })
})

function displayFormat() {
    let str = (() => {
        switch (currentID) {
            case "username":
                return [
                    'Begins with a letter',
                    'Has at least 3 alphanumeric characters'
                ];
            case "email":
                return [
                    'Formats as x@x.x where x can be any alphanumeric characters'
                ];
            case "password":
                return [
                    'Has at least 8 characters',
                    'Contains at least 1 UPPERCASE letter',
                    'Contains at least 1 number#',
                    'Contains at least 1 special character: ( / * - + ! @ # $ ^ & * ) .'
                ];
            case "cPassword":
                return [
                    'Mathches the password'
                ];
            default:
                return [
                    'ERROR OCCURED!'
                ];
        }
    })();
    formatNode.innerHTML = '';
    str.forEach(condition => {
        let divElement = document.createElement("div");
        divElement.appendChild(document.createTextNode(condition));
        formatNode.appendChild(divElement);
    })
    boolArr = Array(str.length);
}

function updateFormat(value) {
    switch (currentID) {
        case "username":
            boolArr[0] = /[a-zA-Z]/.test(value.charAt(0));
            boolArr[1] = value.replace(/[^a-zA-Z0-9]/).length >= 3;
            validationReg[0] = allTrue(boolArr);
            break;
        case "email":
            boolArr[0] = /\w@.+\w\.\w/.test(value);
            validationReg[1] = allTrue(boolArr);
            break;
        case "password":
            boolArr[0] = value.length >= 8;
            boolArr[1] = /[A-Z]/.test(value);
            boolArr[2] = /[0-9]/.test(value);
            boolArr[3] = /[^\w]/.test(value);
            validationReg[2] = allTrue(boolArr);
            password = value;
            break;
        case "cPassword":
            boolArr[0] = value == password && value.length != 0;
            validationReg[3] = allTrue(boolArr);
            break;
    }
    let child = regFormat.firstChild;
    boolArr.forEach((item) => {
        child.classList = item ? "checkYes" : "checkNo";
        child = child.nextSibling;
    });
    regButton.disabled = !allTrue(validationReg);
}

function allTrue(arr) {
    return arr.every((n) => {
        return n;
    });
}