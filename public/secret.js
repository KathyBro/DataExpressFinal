const title = document.getElementById('title');

let click = 0;
const clicker = () => {
    click++;

    if(click % 3 === 0)
    {
        let page = document.getElementById("hotChocolate");
        page.innerHTML += "<img id='Secret' class='item' src='Media/secretRecipe.gif' alt='secret'/>";
    }
};

title.addEventListener('click', clicker);