class DogController {
  static init() {
    Adapter.fetchDogs().then(this.renderDogs);
    const dogsBar = document.getElementById('dog-bar');
    dogsBar.addEventListener('click', this.handleClick);
    const filterButton = document.getElementById('good-dog-filter');
    filterButton.addEventListener('click', this.filterClick);
  }

  static renderDogs(dogs) {
    const dogsBar = document.getElementById('dog-bar');
    dogsBar.innerHTML = '';
    dogs.forEach(DogController.renderDog);
  }

  static renderDog(dog) {
    const newDog = new Dog(dog);
    newDog.span();
  }

  static handleClick(e) {
    const dogId = e.target.dataset.id;
    Adapter.fetchDog(dogId).then(DogController.renderMoreInfo);
  }

  static renderMoreInfo(dog) {
    const newDog = new Dog(dog);
    newDog.dogInfo();
    const goodButton = document.getElementById('is-good-button');
    goodButton.addEventListener('click', DogController.clickGoodDog);
  }

  static clickGoodDog(e) {
    const dogId = e.target.dataset.id;
    const statusString = e.target.dataset.good;
    const reverseStatus = !(statusString === 'true');
    const patch = Adapter.patchDog(dogId, reverseStatus);
    patch.then(json => Adapter.fetchDog(json.id).then(DogController.renderMoreInfo));
  }

  static filterClick(e) {
    if (e.target.innerText.includes('OFF')) {
      e.target.innerText = `${e.target.innerText.slice(0, -2)}N`;
      const getGoodDogs = Adapter.fetchDogs().then(json => json.filter(dogObject => dogObject.isGoodDog));
      getGoodDogs.then(DogController.renderDogs);
    } else {
      e.target.innerText = `${e.target.innerText.slice(0, -1)}FF`;
      DogController.init();
    }
  }
}
