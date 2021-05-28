const nameRegex = /^.*\w.*\w.*$/;
const emptyStrRegex = /^\s*$/;
const passRegexList = [
    /^\S{8,}$/,
    /^.*[A-Z].*$/,
    /^.*\d.*$/,
    /^.*[!@#$%^&*()[\]{};:'"<>,./?].*$/
];
const setCorrectIncorrect = (correctIncorrect, target) => {
    if (emptyStrRegex.test(target.value)) {
        target.classList.remove("incorrectEntry");
        target.classList.remove("correctEntry");
    }
    else if (correctIncorrect) {
        target.classList.remove("incorrectEntry");
        target.classList.add("correctEntry");
    }
    else {
        target.classList.remove("correctEntry");
        target.classList.add("incorrectEntry");
    }
};
const nameCheck = (evt) => {
    errorShow(false);
    setCorrectIncorrect(nameRegex.test(evt.target.value), evt.target);
};
const passwordCheck = (evt) => {
    errorShow(false);
    if (evt.target.value == '') {
        evt.target.classList.remove("incorrectEntry");
        evt.target.classList.add("correctEntry");
    }
    else if (passRegexList[0].test(evt.target.value)) {
        if (passRegexList[1].test(evt.target.value)) {
            if (passRegexList[2].test(evt.target.value)) {
                setCorrectIncorrect(passRegexList[3].test(evt.target.value), evt.target);
            }
            else {
                setCorrectIncorrect(false, evt.target);
            }
        }
        else {
            setCorrectIncorrect(false, evt.target);
        }
    }
    else {
        setCorrectIncorrect(false, evt.target);
    }
};
const errorShow = (showHide) => {
    errorMessage = document.getElementById("Error");
    if (showHide) {
        errorMessage.innerHTML = "All text fields must be filled correctly to continue";
    }
    else {
        errorMessage.innerHTML = "";
    }
};
document.getElementById('Username').addEventListener('focusout', nameCheck);
document.getElementById('Password').addEventListener('focusout', passwordCheck);
document.getElementById("SubmitButton").addEventListener("click", (evt) => {
    if (document.getElementsByClassName("correctEntry").length != 2) {
        evt.preventDefault();
        errorShow(true);
    }
});
