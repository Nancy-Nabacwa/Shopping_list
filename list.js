document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const listName = urlParams.get('list');
    const listTitle = document.getElementById('listTitle');
    const addItemForm = document.getElementById('addItemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemQuantityInput = document.getElementById('itemQuantity');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearList');
    listTitle.textContent = `${listName}`;
    loadItems();
    addItemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const itemName = itemNameInput.value;
      const itemQuantity = itemQuantityInput.value;
      addItem(itemName, itemQuantity);
      saveItem(itemName, itemQuantity);
      itemNameInput.value = '';
      itemQuantityInput.value = '';
      console.log({ itemName, itemQuantity });
    });
    clearListButton.addEventListener('click', () => {
      shoppingList.innerHTML = '';
      clearItems();
    });
    function loadItems() {
      const savedItems = JSON.parse(localStorage.getItem(listName)) || [];
      savedItems.forEach(item => addItem(item.name, item.quantity, item.bought));
    }
    function addItem(name, quantity, bought = false) {
      const listItem = document.createElement('li');
      listItem.style.display = 'flex';
      listItem.style.margin = '10px';
      listItem.style.width = '120%';
      listItem.classList.toggle('bought', bought);
      listItem.innerHTML = `
      <div id= "itemInputDetails">
        <input type="text" value="${toTitleCase(name)}" class="item-name">
        <input type="number" value="${quantity}" class="item-quantity">
      </div>
      <div id="list_buttons">
        <button class="markBought">Bought</button>
        <button class="removeItem">Remove</button> 
      </div>
      `;
      const nameInput = listItem.querySelector('.item-name');
      const quantityInput = listItem.querySelector('.item-quantity');
      const markBoughtButton = listItem.querySelector('.markBought');
      nameInput.addEventListener('input', () => {
        updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
      });
      markBoughtButton.addEventListener('click', () => {
        listItem.classList.toggle('bought');
        updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
      });
      quantityInput.addEventListener('input', () => {
        updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
      });
      listItem.querySelector('.removeItem').addEventListener('click', () => {
        shoppingList.removeChild(listItem);
        removeItem(name);
      });
      shoppingList.appendChild(listItem);
    }
    function saveItem(name, quantity, bought = false) {
      const savedItems = JSON.parse(localStorage.getItem(listName)) || [];
      savedItems.push({ name: toTitleCase(name), quantity, bought });
      localStorage.setItem(listName, JSON.stringify(savedItems));
    }
    function updateItem(oldName, newName, newQuantity, bought) {
      let savedItems = JSON.parse(localStorage.getItem(listName)) || [];
      savedItems = savedItems.map(item => {
        if (item.name === oldName) {
          return { name: toTitleCase(newName), quantity: newQuantity, bought: bought };
        }
        return item;
      });
      localStorage.setItem(listName, JSON.stringify(savedItems));
    }
    function removeItem(name) {
      let savedItems = JSON.parse(localStorage.getItem(listName)) || [];
      savedItems = savedItems.filter(item => item.name !== name);
      localStorage.setItem(listName, JSON.stringify(savedItems));
    }
    function clearItems() {
      localStorage.removeItem(listName);
    }
    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    }
  });

 





































