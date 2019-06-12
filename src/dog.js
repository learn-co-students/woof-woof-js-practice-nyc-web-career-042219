class Dog {
  constructor({ id, name, isGoodDog, image }) {
    this.id = id;
    this.name = name;
    this.isGood = isGoodDog;
    this.image = image;
  }

  span() {
    const dogBar = document.getElementById('dog-bar');
    dogBar.innerHTML += `
      <span data-id='${this.id}'>${this.name}</span>
    `;
  }

  dogInfo() {
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = `
      <img src='${this.image}'>
      <h2>${this.name}</h2>
      <button id='is-good-button' data-id='${this.id}' data-good='${this.isGood}'>${this.isGood ? 'Good Boy' : 'Bad Boy'}</button>
    `;
  }
}
