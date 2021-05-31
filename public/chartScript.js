let url = 'http://localhost:3000/api'
let Persons

const run = () => {
    fetch(url).then(response => response.json()).then(promise_data => {
        Persons = promise_data
        main();
    }); 
}

const main = () => {
    var myChart = new Chart(
        document.getElementById('myChart'),
        configureation(0)
    )
    var myChart = new Chart(
        document.getElementById('myChart2'),
        configureation(1)
    )
    var myChart = new Chart(
        document.getElementById('myChart3'),
        configureation(2)
    )
    return myChart
};

const configureation = (num) => {

    let config = {
        type: 'polarArea',
        data: makeData(num),
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: '#FFF',
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#6AF'
                    },
                    ticks: {
                        color: '#FFF',
                        backdropColor: '#26B'
                    }
                }
            }
        }
    };
    
    console.log('config created')
    
    return config
}

const makeData = (indexNum) => {
    let ar1 = []
    let ar2 = []
    let ar3 = []
    let ar4 = []
    if(indexNum == 0){
        Persons.forEach(person => {
            if(person.answers[0] == 'Mint'){
               ar1.push(person)
            }else if(person.answers[0] == 'Carmel'){
                ar2.push(person)
            }else if(person.answers[0] == 'Hazelnut'){
                ar3.push(person)
            }else{
                ar4.push(person)
            }
        })
    }else if (indexNum == 1){
        Persons.forEach(person => {
            if(person.answers[1] == 'Bob'){
               ar1.push(person)
            }else if(person.answers[1] == 'Sally'){
                ar2.push(person)
            }else if(person.answers[1] == 'Suzette'){
                ar3.push(person)
            }else{
                ar4.push(person)
            }
        })
    }else{
        Persons.forEach(person => {
            if(person.answers[2] == 'Hibernate'){
               ar1.push(person)
            }else if(person.answers[2] == 'Fireplace'){
                ar2.push(person)
            }else if(person.answers[2] == 'Snowmen'){
                ar3.push(person)
            }else{
                ar4.push(person)
            }
        })
    }


    return datamaker(indexNum, ar1.length, ar2.length, ar3.length,ar4.length)
    
}

const datamaker = (questnum, data1, data2, data3, data4) => {
    let data
    let num1 = data1
    let num2 = data2
    let num3 = data3
    let num4 = data4
    console.log(num1)
    console.log(questnum)

    if(questnum == 0){
        data = {
            labels: [
                'Mint',
                'Caramel',
                'Hazelnut',
                'Regular'
            ],
            datasets: [{
                label: 'What is your flavor of hot chocolate?',
                data: [num1, num2, num3, num4],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
           
        };
        console.log('1 created')
    }else if(questnum == 1){
        data = {
            labels: [
                'Bob',
                'Sally',
                'Suzette',
                'Harry'
            ],
            datasets: [{
                label: `If Santa had another reindeer, what would it's name be?`,
                data: [num1, num2, num3, num4],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        };
    console.log('2 Created')
    }else if(questnum == 2){
        data = {
            labels: [
                'Hibernate',
                'Cozying by the fire',
                'Make Snowmen',
                'Bake Cookies'
            ],
            datasets: [{
                label: 'What is your favorite activity for the winter?',
                data: [num1, num2, num3, num4],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ]
            }]
        }; 
    console.log('3 created')
    }
    console.log(data)
    return data
}



run()



