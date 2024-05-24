document.addEventListener('DOMContentLoaded', () => {
    const addListForm = document.getElementById('addListForm');
    const listNameInput = document.getElementById('listName');
    const lists = document.getElementById('lists');
    const clearAllListsButton = document.getElementById('clearAllLists');
    loadLists();
    addListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const listName = listNameInput.value;
        addList(listName);
        saveList(listName);
        listNameInput.value = '';
    });
    clearAllListsButton.addEventListener('click', () => {
        clearAllLists();
        lists.innerHTML = '';
    });
    function loadLists() {
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists.forEach(list => addList(list.name));
    }
    function addList(listName) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <a href="list.html?list=${encodeURIComponent(listName)}"id="added_list">
                ${listName} 
            </a>
            <button class="deleteList">Delete</button>
        `;
        lists.appendChild(listItem);
        listItem.querySelector('.deleteList').addEventListener('click', () => {
            deleteList(listName);
            lists.removeChild(listItem);
        });
    }
    function saveList(listName) {
        const savedLists = JSON.parse(localStorage.getItem('lists')) || [];
        savedLists.push({ name: listName});
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

