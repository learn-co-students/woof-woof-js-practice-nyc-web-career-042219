// const dogBar = document.querySelector("#dog-bar")
const dogsUrl = "http://localhost:3000/pups"
const dogSummary = document.querySelector("#dog-summary-container")
let dogs = []
let dogFilter = false



function fetchDogs() {
  fetch(dogsUrl)
    .then(res => res.json())
    .then(data => {
      dogs = data
      console.log(data)
      data.map(renderDog)
    })
}

function renderDog(dog) {
  // console.log(dogs)
  document.querySelector("#dog-bar").innerHTML += `
  <span id="doggy">${dog.name}</span>
  `
}

function findDog(e) {
  let dogName = e.target.innerText
  for(dog of dogs) {
    if (dog.name === dogName) {
      return dog
    }
  }
}

function summarizeDog(dog) {
  let quality = ""
  if (dog.isGoodDog) {
    quality = "Good Dog!"
  } else {
    quality = "Bad Dog!"
  }

  document.querySelector("#dog-summary-container").innerHTML = `
  <img src=${dog.image} class="dog-avatar" />
  <h2>${dog.name}</h2>
  <button class="dog-quality-button">${quality}</button>
  `
}

function switchFilter() {
  if (dogFilter) {
    document.querySelector("#good-dog-filter").innerText = "Filter good dogs: ON"
  } else {
    document.querySelector("#good-dog-filter").innerText = "Filter good dogs: OFF"
  }
}

function filterDogs() {
  if (dogFilter) {
    const goodDogs = dogs.filter(dog => dog.isGoodDog === true)
    goodDogs.map(renderDog);
  } else {
    dogs.map(renderDog);
  }
}

function resetDogContainer() {
  document.querySelector("#dog-bar").innerHTML = ""
}

document.addEventListener("DOMContentLoaded", function() {

  fetchDogs();

  document.body.addEventListener("click", function(e) {
    if (e.target.id === "doggy") {
      let dog = findDog(e)
      summarizeDog(dog)
    }
  })
  document.querySelector("#good-dog-filter").addEventListener("click", function(e) {
    e.preventDefault
    resetDogContainer();
    dogFilter = !dogFilter
    switchFilter();
    filterDogs();
  })
})
