//DECLARATIONS && ASSIGNMENTS
const dogURL = "http://localhost:3000/pups";
const dogDisplayDiv = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info")
const filterDogs = document.querySelector("#good-dog-filter")
let dogsArray = [];
let currentDog = null;



init()

//FETCHES
function init(){
	fetch(dogURL)
		.then(res => res.json())
		.then(dogsData => {
			displayDogs(dogsData)
			localDogs(dogsData)
	})

}

function changeGoodDog(dog){
	data = !dog.isGoodDog
	fetch(`${dogURL}/${dog.id}`, {
		method: 'PATCH', // or 'PUT'
	  	body: JSON.stringify({isGoodDog: data}), // data can be `string` or {object}!
	  	headers:{
	    'Content-Type': 'application/json'
  		}
	}).then(res => res.json())
		.then(response => console.log('Success:', JSON.stringify(response)))
		.catch(error => console.error('Error:', error));
		console.log(dog.isGoodDog)
}

//HELPERS
function displayDogs(dogs){
	let allDogs = dogs.map(dog => {
		let dogSpan = document.createElement("span");
		dogSpan.innerText = dog.name;
		dogSpan.dataset.id = dog.id
		dogDisplayDiv.appendChild(dogSpan);
		return dog
	})
	// dogsArray = allDogs
}

function findOneDog(targetId){
	return dogsArray.find(dog => dog.id === parseInt(targetId))
}

function displayDogInfo(dog){
	dogInfo.innerHTML = "";
	dogInfo.innerHTML = `
		<img src=${dog.image}>
		<h2>${dog.name}</h2>
		<button>${isGoodDog(dog)}</button>
	`
}

function isGoodDog(dog){
	if (dog.isGoodDog){
		return "Good Dog!"
	} else {
		return "Bad Dog!"
	}
}

function localDogs(dogs){
	dogs.forEach(dog => dogsArray.push(dog))
}

//EVENT LISTENERS
dogDisplayDiv.addEventListener("click", function(e){
	if (e.target.tagName === "SPAN"){
		currentDog = findOneDog(e.target.dataset.id)
		displayDogInfo(currentDog)
	}
})

dogInfo.addEventListener("click", function(e){
	if (e.target.tagName === "BUTTON"){
		currentDog.isGoodDog = !currentDog.isGoodDog
		changeGoodDog(currentDog)
		e.target.innerText = isGoodDog(currentDog)
	}
})

filterDogs.addEventListener("click", function(e){
	if(filterDogs.innerText.includes("OFF")){
		filterDogs.innerText = "Filter good dogs: ON"
		let goodDogs = dogsArray.filter(dog => {
			return dog.isGoodDog === true
		})
		dogDisplayDiv.innerHTML = ""
		displayDogs(goodDogs)
	} else {
		filterDogs.innerText = "Filter good dogs: OFF"
		dogDisplayDiv.innerHTML = ""
		displayDogs(dogsArray)
	}
})



