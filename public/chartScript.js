const data = {
    labels: [
      'Red',
      'Green',
      'Grey',
      'Blue'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [11, 16, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
};

const config = {
    type: 'polarArea',
    data: data,
    options: {}
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

var myChart2 = new Chart(
    document.getElementById('myChart2'),
    config
);

var myChart3 = new Chart(
    document.getElementById('myChart3'),
    config
);