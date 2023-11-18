document.addEventListener('DOMContentLoaded', (event) => {
  const content = document.getElementById('content');

  function fetchAndDisplay(url) {
      return fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log('Data received:', data);
              return data;
          })
          .catch(error => console.error('Error fetching and displaying data:', error));
  }

  function displayHouses(houses) {
      const houseList = document.createElement('ul');
      houseList.setAttribute('id', 'house-list');

      houses.forEach(house => {
          const listItem = document.createElement('li');
          listItem.textContent = house.name;

          listItem.addEventListener('click', () => {
              fetchAndDisplay(`https://api.gameofthronesquotes.xyz/v1/house/${house.name.toLowerCase()}`)
                  .then(data => displayHouseMembers(data.members));
          });

          houseList.appendChild(listItem);
      });

      content.innerHTML = '';
      content.appendChild(houseList);
  }

  function displayHouseMembers(members) {
      const memberList = document.createElement('ul');

      members.forEach(member => {
          const listItem = document.createElement('li');
          listItem.textContent = member.name;
          memberList.appendChild(listItem);
      });

      content.innerHTML = '';
      content.appendChild(memberList);
  }

  function displayCharacters(characters) {
      const characterList = document.createElement('ul');

      characters.forEach(character => {
          const listItem = document.createElement('li');
          listItem.textContent = character.name;
          characterList.appendChild(listItem);
      });

      content.innerHTML = '';
      content.appendChild(characterList);
  }

  function displayQuotes(data) {
    const quotesList = document.createElement('ul');

    // Check if data is an object with 'sentence' and 'character' properties
    if (data && data.sentence && data.character) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${data.character.name}</strong>: ${data.sentence}`;
        quotesList.appendChild(listItem);
    } else {
        console.error('Invalid quote data:', data);
    }

    content.innerHTML = '';
    content.appendChild(quotesList);
}



  document.getElementById('houses').addEventListener('click', () => {
      fetchAndDisplay('https://api.gameofthronesquotes.xyz/v1/houses')
          .then(data => displayHouses(data));
  });

  document.getElementById('persons').addEventListener('click', () => {
      fetchAndDisplay('https://api.gameofthronesquotes.xyz/v1/characters')
          .then(data => displayCharacters(data));
  });

  document.getElementById('quotes').addEventListener('click', () => {
      fetchAndDisplay('https://api.gameofthronesquotes.xyz/v1/random')
          .then(data => displayQuotes(data));
  });
});
