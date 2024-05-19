

 
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
        listItem.innerHTML = `
            <input type="text" value="${name}" class="item-name">
            <input type="number" value="${quantity}" class="item-quantity">
            <div>
                <button class="markBought">Bought</button>
                <button class="removeItem">Remove</button>
            </div>
        `;
        const nameInput = listItem.querySelector('.item-name');
        const quantityInput = listItem.querySelector('.item-quantity');
        nameInput.addEventListener('input', () => {
            updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
        });
        quantityInput.addEventListener('input', () => {
            updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
        });
        listItem.querySelector('.markBought').addEventListener('click', () => {
            listItem.classList.toggle('bought');
            updateItem(name, nameInput.value, quantityInput.value, listItem.classList.contains('bought'));
        });
        listItem.querySelector('.removeItem').addEventListener('click', () => {
            shoppingList.removeChild(listItem);
            removeItem(name);
        });
        if (bought) {
            listItem.classList.add('bought');
        }
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



// list script
function addItem(){
    let name = document.item_form.item_name.value;
    let quantity = document.item_form.item_quantity.value;
    let tr = document.createElement('tr');
    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));
    td1.innerHTML = name;
    td2.innerHTML = quantity;
    td3.innerHTML ='<input type="button" value="delete" name="delete_btn" id="delete_btn" onclick="deleteItem(this);">'
    td4.innerHTML ='<input type="button" value="edit" name="edit_btn"  id="edit_btn" onclick="editItem(this);">'
    document.getElementById("item_table").appendChild(tr)
}
function deleteItem(item){
    let s = item.parentNode.parentNode;
    s.parentNode.removeChild(s)
}
function editItem(item){
    let name = document.item_form.item_name.value;
    let quantity = document.item_form.item_quantity.value;
    let s = item.parentNode.parentNode;
    let tr = document.createElement('tr');
    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));
    td1.innerHTML = '<input type="text" placeholder="Enter Item Name" class="item_input" name="edit_name">';
    td2.innerHTML = '<input type="number" placeholder="Enter Item Quantity" class="item_input" name="edit_quantity">';
    td3.innerHTML ='<input type="button" value="delete" name="delete_btn" id="delete_btn" onclick="deleteItem(this);">'
    td4.innerHTML ='<input type="button" value="edit" name="edit_btn" id="edit_btn" onclick="addeditItem(this);">'
    document.getElementById("item_table").replaceChild(tr, s)
}
function addeditItem(item){
    let name = document.item_form.edit_name.value;
    let quantity = document.item_form.edit_quantity.value;
    let s = item.parentNode.parentNode;
    let tr = document.createElement('tr');
    let td1 = tr.appendChild(document.createElement('td'));
    let td2 = tr.appendChild(document.createElement('td'));
    let td3 = tr.appendChild(document.createElement('td'));
    let td4 = tr.appendChild(document.createElement('td'));
    td1.innerHTML = name;
    td2.innerHTML = quantity;
    td3.innerHTML ='<input type="button" value="delete" name="delete_btn" id="delete_btn" onclick="deleteItem(this);">'
    td4.innerHTML ='<input type="button" value="edit" name="edit_btn" id="edit_btn" onclick="editItem(this);">'
    document.getElementById("item_table").replaceChild(tr, s)
}

// home styling
function addList(){
    let name = document.list_form.list_name.value;
    let tr = document.createElement('tr');
    let td1 = tr.appendChild(document.createElement('td'));
    td1.innerHTML = name;
    document.getElementById("item_table").appendChild(tr)
}