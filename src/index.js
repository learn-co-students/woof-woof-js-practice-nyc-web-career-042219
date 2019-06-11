const DOG_URL = 'http://localhost:3000/pups';
let DOG_ARR = [];

const dogBar = document.querySelector('#dog-bar');
const dogInfo = document.querySelector('#dog-info');

fetchDogs();

dogBar.addEventListener('click', (e) => {
    if(e.target.tagName === 'SPAN') {
        dogName = e.target.innerText
        clickedDog = DOG_ARR.find(function(dog) {
            return dog.name === dogName;
        })
        dogDiv(clickedDog);
    }
})

dogInfo.addEventListener('click', (e) => {
    let newGoodness;
    if(e.target.id === 'good-btn') {
        if(e.target.innerText === 'Good Dog!') {
            e.target.innerText = 'Bad Dog!';
            newGoodness = false;
        } else {
            e.target.innerText = 'Good Dog!';
            newGoodness = true;
        }
    }
    updateGoodDogs(e.target.dataset.id, newGoodness)
})

function fetchDogs() {
    fetch(DOG_URL)
    .then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => {
            DOG_ARR.push(dog);
            barDogs(dog)
        })
    })
};

function updateGoodDogs(dogId, newGoodness) {
    fetch(`${DOG_URL}/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'isGoodDog': newGoodness
        })
    })
    // only need to do anything down here if you're pessimistically rendering
    // .then(res => res.json())
    // .then(dog => console.log(dog))
}

function barDogs(dog) {
    let dogSpan = document.createElement('span');
    dogSpan.innerHTML = `${dog.name}`
    dogBar.appendChild(dogSpan);
}

function dogDiv(dog) {
    let buttonText = '';
    if(dog.isGoodDog === true) {
        buttonText = 'Bad Dog!';
    } else {
        buttonText = 'Good Dog!';
    }

    let dogDetails = `
    <div>
    <img src='${dog.image}'>
    <h2>${dog.name}</h2>
    <button id='good-btn' data-id='${dog.id}'>${buttonText}</button>
    </div>
    `
    //* appendChild would create many nodes, this replaces
    // let dogDetails = document.createElement('div')
    // dogDetails.innerHTML = `
    // <img src='${dog.image}'>
    // <h2>${dog.name}</h2>
    // <button>Good Dog!</button>
    // `
    dogInfo.innerHTML = dogDetails;
}