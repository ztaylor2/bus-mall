'use strict';

function Image(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.timesShown = 0;
  this.timesClicked = 0;
  Image.all.push(this);
}

Image.numQuestionsAnswered = 0;
Image.names = [document.getElementById('imgOne'), document.getElementById('imgTwo'), document.getElementById('imgThree')];
Image.section = document.getElementById('images');
Image.all = [];
Image.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


 // load local storage if it exists
if(window.localStorage.length !== 0) {
  // load data and asign data
  Image.all = JSON.parse(localStorage.test);
  console.log(Image.all, 'local storage exists');
} else {
  for(var i = 0; i < Image.allNames.length; i++) {
    new Image(Image.allNames[i]);
  }
}


function randomIndex() {
  return Math.floor(Math.random() * Image.all.length);
}

// functions
var lastNumbers = [];

function loadPhotos() {

  var numbers = [];
  numbers[0] = randomIndex();
  numbers[1] = randomIndex();
  numbers[2] = randomIndex();

  while (numbers[0] === lastNumbers[lastNumbers.length - 1] || numbers[0] === lastNumbers[lastNumbers.length - 2] || numbers[0] === lastNumbers[lastNumbers.length - 3]) {
    numbers[0] = randomIndex();
  }

  while (numbers[0] === numbers[1] || numbers[1] === lastNumbers[lastNumbers.length - 1] || numbers[1] === lastNumbers[lastNumbers.length - 2] || numbers[1] === lastNumbers[lastNumbers.length - 3]) {
    numbers[1] = randomIndex();
  }

  while (numbers[0] === numbers[2] || numbers[1] === numbers[2] || numbers[2] === lastNumbers[lastNumbers.length - 1] || numbers[2] === lastNumbers[lastNumbers.length - 2] || numbers[2] === lastNumbers[lastNumbers.length - 3]) {
    numbers[2] = randomIndex();
  }

  for(var i = 0; i < Image.names.length; i++) {
    Image.names[i].src = Image.all[numbers[i]].source;
    Image.names[i].alt = Image.all[numbers[i]].name;
    Image.all[numbers[i]].timesShown += 1;
    lastNumbers.push(numbers[i]);
  }
}

function whenDoneAskingQuestions() {
  if(Image.numQuestionsAnswered === 25) {

    // remove event listener
    for(var i = 0; i < Image.names.length; i++) {
      Image.names[i].removeEventListener('click', randomImage);
    }

    document.getElementById('explanation').textContent = 'Results:';
    document.getElementById('images').hidden = true;
    buildChart();
    return;
  }
}



// event handler
function randomImage(e) {

  if(e.target.id === 'images') {
    alert('Please click on an image.');
    return;
  }

  // add to the array of which image is clicked
  for(var i = 0; i < Image.all.length; i++) {
    if(Image.all[i].name === e.target.alt) {
      Image.all[i].timesClicked++;

      // add a click to the image that is clicked into local storage
      // +++++++++++++++++++++++++++++++++++++++++++++++++++
      localStorage.test = JSON.stringify(Image.all);
    }
  }

  // add to the number questions answered
  Image.numQuestionsAnswered++;

  // when 25 clicks are reached
  whenDoneAskingQuestions();

  // load three photos
  loadPhotos();
}



// deploy event listeners
Image.section.addEventListener('click', randomImage);



// load photos on page load
loadPhotos();

// chart stuff
var labels = [];

for(var i = 0; i < Image.all.length; i++) {
  labels.push(Image.all[i].name);
}

function buildChart() {
  var data = [];

  for(var i = 0; i < Image.all.length; i++) {
    data.push(Image.all[i].timesClicked);
  }

  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Vote Totals',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            max: 10,
            min: 0,
            stepsize: 1.0,
            beginAtZero:true
          }
        }]
      }
    }
  });
}
