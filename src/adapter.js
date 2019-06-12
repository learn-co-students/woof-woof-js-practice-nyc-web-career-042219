class Adapter {
  static async fetchDogs() {
    const url = 'http://localhost:3000/pups';
    const res = await fetch(url);
    return res.json();
  }

  static async fetchDog(id) {
    const url = `http://localhost:3000/pups/${id}`;
    const res = await fetch(url);
    return res.json();
  }

  static async patchDog(id, reversedStatus) {
    const url = `http://localhost:3000/pups/${id}`;
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ isGoodDog: reversedStatus }),
    });
    return res.json();
  }
}
