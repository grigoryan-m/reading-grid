document.addEventListener("DOMContentLoaded", ()=>{
    const goalField = document.getElementById("limit")
    ,successButton = document.getElementById("limitReached")
    ,failButton = document.getElementById("limitNotReached")
    ,grid = document.getElementsByClassName("grid")[0]
    ,date = new Date()
    ,lastChangeOutput = document.getElementById("lastChangeOutput");

    let lastChange = getCookie("lastChange");
    let gridArray = getCookie("gridArray");
    console.log(gridArray);
    let currentDate = date.getDate().toString() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    function canChange(){
        lastChangeOutput.innerText = lastChange;
        setCookie("lastChange", lastChange, 365);
        setCookie("gridArray", gridArray, 365);
        if(lastChange === currentDate){
            successButton.disabled = true;
            successButton.style.cursor = "not-allowed";
    
            failButton.disabled = true;
            failButton.style.cursor = "not-allowed";
        }
    }
    canChange();
    successButton.addEventListener("click", ()=>{
        const successCell = document.createElement("div");
        successCell.classList += "cell green";
        gridArray += "1";
        grid.appendChild(successCell);
        lastChange = date.getDate().toString() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        canChange();
    });
    failButton.addEventListener("click", ()=>{
        const failCell = document.createElement("div");
        failCell.classList += "cell red";
        gridArray += "0";
        grid.appendChild(failCell);
        lastChange = date.getDate().toString() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        canChange();
    });

    function initGrid(){
        for(let i = 0; i < gridArray.length; i++){
            if(gridArray[i] === "1"){
                const successCell = document.createElement("div");
                successCell.classList += "cell green";
                grid.appendChild(successCell);
            }else if(gridArray[i] === "0"){
                const successCell = document.createElement("div");
                successCell.classList += "cell red";
                grid.appendChild(successCell);
            }
        }
    }
    initGrid();
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}