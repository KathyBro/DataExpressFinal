const title = document.getElementById('title');

let click = 0;
const clicker = () => {
    click++;

    if(click >= 5)
    {

    }
};

title.addEventListener('click', clicker);