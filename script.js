const redirect = document.getElementById('redirectButton');
 
function redirectToPage(){
    window.location.href = "list.html"

}
redirectButton.addEventListener('click', redirectToPage)


//
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsList = document.getElementById('resultsList');
  
    function getResults(input) {
        const items = ['List 2', 'Clothes', 'Groceries', 'Toiletries', 'List 1']; 
        const filteredItems = items.filter(item => item.toLowerCase().includes(input.toLowerCase()));
        resultsList.innerHTML = ''; 
        filteredItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            resultsList.appendChild(listItem);
        });
    }
   
    searchInput.addEventListener('keyup', function(e) {
        getResults(this.value);
    });
    
    searchButton.addEventListener('click', function() {
        getResults(search-input.value);
    });
    display(result)
});
function display(result){
    const content = result.map((lisr)=>{
        return "<li onclick = selectInput(this)>" + list + "</li>";
    });

    resultBox.innerHTML = "<li>" + content.join('') + "</li>";
}
function selectInput(list){
    inputBox.value = list.innerHTML
}



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