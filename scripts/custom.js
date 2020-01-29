function createLoader(){
    let matches = document.querySelectorAll(".loader-con");
    for(let i=0; i<matches.length; i++){
        for(let a=1; a<=4; a++){
            let el = document.createElement("div");
            el.setAttribute("class", "loader loader"+a);
            matches[i].appendChild(el);
        }
    }
}

createLoader();