document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const listName = urlParams.get('list');
    const categoryName = urlParams.get('category');
    const listTitle = document.getElementById('listTitle');
    const addItemForm = document.getElementById('addItemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemQuantityInput = document.getElementById('itemQuantity');
    const shoppingList = document.getElementById('shoppingList');
    const clearListButton = document.getElementById('clearList');
    listTitle.textContent = `${listName} - ${categoryName}`;
    loadItems();
    addItemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = itemNameInput.value;
        const itemQuantity = itemQuantityInput.value;
        addItem(itemName, itemQuantity);
        saveItem(itemName, itemQuantity);
        itemNameInput.value = '';
        itemQuantityInput.value = '';
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
        listItem.classList.toggle('bought', bought);
        listItem.innerHTML = `
            <input type="text" value="${name}" class="item-name">
            <input type="number" value="${quantity}" class="item-quantity">
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
        savedItems.push({ name, quantity, bought });
        localStorage.setItem(listName, JSON.stringify(savedItems));
    }
    function updateItem(oldName, newName, newQuantity, bought) {
        let savedItems = JSON.parse(localStorage.getItem(listName)) || [];
        savedItems = savedItems.map(item => item.name === oldName ? { name: newName, quantity: newQuantity, bought } : item);
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
});

 
// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const listName = urlParams.get('list');
//     const categoryName = urlParams.get('category');
//     const listTitle = document.getElementById('listTitle');
//     const addItemForm = document.getElementById('addItemForm');
//     const itemNameInput = document.getElementById('itemName');
//     const itemQuantityInput = document.getElementById('itemQuantity');
//     const shoppingList = document.getElementById('shoppingList');
//     const clearListButton = document.getElementById('clearList');
//     listTitle.textContent = `${listName} - ${categoryName}`;
//     loadItems();
//     addItemForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const itemName = itemNameInput.value;
//         const itemQuantity = itemQuantityInput.value;
//         addItem(itemName, itemQuantity);
//         saveItem(itemName, itemQuantity);
//         itemNameInput.value = '';
//         itemQuantityInput.value = '';
//     });
//     clearListButton.addEventListener('click', () => {
//         shoppingList.innerHTML = '';
//         clearItems();
//     });
//     function loadItems() {
//         const savedItems = JSON.parse(localStorage.getItem(listName)) || [];
//         savedItems.forEach(item => addItem(item.name, item.quantity, item.bought));
//     }
//     function addItem(name, quantity, bought = false) {
//         const listItem = document.createElement('li');
//         listItem.classList.toggle('bought' , bought)
//         listItem.innerHTML = `
//             <input type="text" value="${name}" class="item-name">
//             <input type="number" value="${quantity}" class="item-quantity">
//             <div>
//                 <button class="markBought">Bought</button>
//                 <button class="removeItem">Remove</button>
//             </div>
//         `
//         ;
        
//         const nameInput = listItem.querySelector('.item-name');
//         const quantityInput = listItem.querySelector('.item-quantity');
//         const markBoughtButton = listItem.querySelector('.markBought')
//         nameInput.addEventListener('input', () => {
//             updateItem(name, nameInput.value, quantityInput.value, bought);
//         });
//         markBoughtButton.addEventListener('click' , ()=>{
//             listItem.classList.toggle('bought')
//             updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
//         })
//         quantityInput.addEventListener('input', () => {
//             updateItem(name, nameInput.value, quantityInput.value, bought);
//         });
//         listItem.querySelector('.markBought').addEventListener('click', () => {
//             bought = !bought;
//             listItem.classList.toggle('bought');
//             updateItem(name, nameInput.value, quantityInput.value, bought);
//         });
//         listItem.querySelector('.removeItem').addEventListener('click', () => {
//             shoppingList.removeChild(listItem);
//             removeItem(name);
//         });
        
//         if (bought) {
//             listItem.classList.add('bought');
//         }
//         shoppingList.appendChild(listItem);
//     }
//     function saveItem(name, quantity, bought = false) {
//         const savedItems = JSON.parse(localStorage.getItem(listName)) || [];
//         savedItems.push({ name, quantity, bought });
//         localStorage.setItem(listName, JSON.stringify(savedItems));
//     }
//     function updateItem(oldName, newName, newQuantity, bought) {
//         let savedItems = JSON.parse(localStorage.getItem(listName)) || [];
//         savedItems = savedItems.map(item => item.name === oldName ? { name: newName, quantity: newQuantity, bought } : item);
//         localStorage.setItem(listName, JSON.stringify(savedItems));
//     }
//     function removeItem(name) {
//         let savedItems = JSON.parse(localStorage.getItem(listName)) || [];
//         savedItems = savedItems.filter(item => item.name !== name);
//         localStorage.setItem(listName, JSON.stringify(savedItems));
//     }
//     function clearItems() {
//         localStorage.removeItem(listName);
//     }
// });



document.addEventListener('DOMContentLoaded', () => {
    const addListForm = document.getElementById('addListForm');
    const listNameInput = document.getElementById('listName');
    const categoryNameInput = document.getElementById('categoryName');
    const lists = document.getElementById('lists');
    const clearAllListsButton = document.getElementById('clearAllLists');
    loadLists();
    addListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const listName = listNameInput.value;
        const categoryName = categoryNameInput.value;
        addList(listName, categoryName);
        saveList(listName, categoryName);
        listNameInput.value = '';
        categoryNameInput.value = '';
    });
    clearAllListsButton.addEventListener('click', () => {
        clearAllLists();
        lists.innerHTML = '';
    });
    function loadLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists.forEach(list => addList(list.name, list.category));
    }
    function addList(listName, categoryName) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="list.html?list=${encodeURIComponent(listName)}&category=${encodeURIComponent(categoryName)}"id="added_list">
                ${listName} is in  ${categoryName} 
            </a>
            <button class="deleteList">Delete</button>
        `;
        lists.appendChild(listItem);
        listItem.querySelector('.deleteList').addEventListener('click', () => {
            deleteList(listName);
            lists.removeChild(listItem);
        });
    }
    function saveList(listName, categoryName) {
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists.push({ name: listName, category: categoryName });
        localStorage.setItem('lists', JSON.stringify(savedLists));
    }
    function deleteList(listName) {
        let savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists = savedLists.filter(list => list.name !== listName);
        localStorage.setItem('lists', JSON.stringify(savedLists));
        localStorage.removeItem(listName); // Remove items associated with the list
    }
    function clearAllLists() {
        localStorage.removeItem('lists');
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists.forEach(list => localStorage.removeItem(list.name));
    }
});


































