const DOGS_URL = 'http://localhost:3000/pups/';
let DOGS_ARRAY = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    
    let filter = false;

    const body = document.querySelector('body');
    body.addEventListener('click', function(e) {
        if (e.target.tagName === 'SPAN') {
            showDogInfo(e.target.dataset.id)
        } else if (e.target.id === 'good-dog-filter') {
            e.target.innerHTML = (!filter) ? "Filter good dogs: ON" : "Filter good dogs: OFF"

            const allDogs = document.querySelectorAll('span');
            
            allDogs.forEach(function(dog) {
                if (!filter)
                    dog.style.display = (dog.dataset.good === 'true') ? "" : "none";
                else
                    dog.style.display = "";
            })

            filter = !filter;
        } else if (e.target.id === 'good-dog') {
            changeDog(e);
        }
    })
});

function fetchDogs(dogBar) {
    fetch(DOGS_URL)
    .then(resp => resp.json())
    .then(function(json) {
        const dogBar = document.getElementById('dog-bar');

        json.forEach(function(pup) {
            dogBar.appendChild(createDog(pup));
            DOGS_ARRAY.push(pup);
        })        
    })
}

function createDog(pup) {
    dog = document.createElement('span');
    dog.dataset.good = pup.isGoodDog;
    dog.dataset.id = pup.id;
    dog.innerHTML = `${pup.name}`;
    return dog;
}

function findDog(id) {
    let index = Number(id);
    return DOGS_ARRAY.find(function(pup) {
        return index === pup.id
    })
}

function showDogInfo(id) {
    let dog = findDog(id);

    const container = document.getElementById('dog-info');
    container.innerHTML = `
        <img src=${dog.image}>
        <h2> ${dog.name} </h2>
        <button id='good-dog' data-id='${dog.id}'> ${dog.isGoodDog} </button>
    `
}

function changeDog(e) {
    let dog = findDog(e.target.dataset.id);
    dog.isGoodDog = !dog.isGoodDog;

    fetch(DOGS_URL + dog.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isGoodDog: dog.isGoodDog })
    })

    //change in DOM
    e.target.innerText = `${dog.isGoodDog}`;
}