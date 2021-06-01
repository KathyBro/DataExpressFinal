const title = document.getElementById('title');

let click = 0;
const clicker = () => {
    click++;

    if(click === 5)
    {
        let page = document.getElementById("hotChocolate");
        page.innerHTML += "<p><img src='Media/secretRecipe.gif' alt='secret'/></p>";
    }
};

title.addEventListener('click', clicker);