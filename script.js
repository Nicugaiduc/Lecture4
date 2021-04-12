window.onload = function() {
    showGroceryList();
    showShoppingCartList();
}

// SHOW SHOPPING CART
const shoppingCart  =document.querySelector('.shopping-cart-img');
const shoppingCartContainer = document.querySelector('.shopping-cart')
shoppingCart.addEventListener('click', ()=> {
    shoppingCartContainer.classList.toggle('show');
});

//ADD NEW PRODUCT TO GROCERY LIST
let addProductBtn = document.querySelector('.addProduct-btn');
addProductBtn.addEventListener('click', ()=>{
    let productName = document.querySelector('.product-name');
    let productDescription = document.querySelector('.product-description');
    let productPrice = document.querySelector('.product-price');
    let inStock = document.querySelector('.inStock-btn').checked;
    let getLocalStorage = localStorage.getItem("groceryListItem");

    if(productName.value === "" || productDescription.value === "" || productPrice.value === "") {
        alert("Complete all the inputs!!!");
        return false;
    }
    let numbers = /^[0-9]+$/;
    if(!productPrice.value.match(numbers)){
        alert("Only numbers in Product Price input");
        return false;
    }
    
    if(getLocalStorage == null) {
        groceryListItem = [];
    } else {
        groceryListItem = JSON.parse(getLocalStorage);
    }
    let groceryItem = {
        id:Date.now(),
        name: productName.value,
        description: productDescription.value,
        price: productPrice.value,
        instock: inStock
    }
    groceryListItem.unshift(groceryItem);
    localStorage.setItem("groceryListItem", JSON.stringify(groceryListItem));
    showGroceryList();
    productName.value = '';
    productDescription.value = '';
    productPrice.value = '';
    document.querySelector('.inStock-btn').checked = false;
});

//CHECK IF FORM HAS ALL INPUTS COMPLETE
function checkIfComplete(productName, productDescription, productPrice) {
    if(productName === "" || productDescription === "" || productPrice === "") {
        alert("WAAAAAI BOULE");
        return false;
    }
} 

//SHOW PRODUCST TO PAGE
function showGroceryList() {
    let getLocalStorage = localStorage.getItem("groceryListItem");
    if(getLocalStorage == null) {
        groceryListItem = [];
    } else {
        groceryListItem = JSON.parse(getLocalStorage);
    }
    let newElement = '';

    groceryListItem.forEach((element, index)=>{
        if(element.instock === true) {
            isChecked = "In Stock";
            dis = '';
        } else {
            isChecked = "Not In Stock";
            dis = 'disabled';
        }
        newElement += `<div class="grocery-item" id="${index}">`+
        `<div class="close-btn" onclick="deleteGroceryProduct(${index})">`+
            '<svg height="15px" viewBox="0 0 329.26933 329" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>'+
        '</div>'+
        `<h2 class="title">${element.name}</h2>`+
        `<p class="description">${element.description}</p>`+
        `<p class="price">Price: ${element.price}$</p>`+
        `<p class="stock">${isChecked}</p>`+
        `<button class="buy-btn" ${dis} onclick="addProductToShoppingCart(${index})">Buy</button>`+
    '</div>';
    });
    document.getElementById("grocery-list").innerHTML = newElement;
}

//DELETE PRODUCT FROM PAGE
function deleteGroceryProduct(index) {
    let getLocalStorageData = localStorage.getItem("groceryListItem");
    groceryListItem = JSON.parse(getLocalStorageData);
    groceryListItem.splice(index, 1);
    localStorage.setItem("groceryListItem", JSON.stringify(groceryListItem));
    showGroceryList();
}

//ADD PRODUCT TO SHOPPING CART
function addProductToShoppingCart(index) {
    let getLocalStorageData = localStorage.getItem("groceryListItem");
    groceryListItem = JSON.parse(getLocalStorageData);
    const found = groceryListItem.splice(index,1);

    let getLocalStoragee = localStorage.getItem("shoppingCartListItem");
    if(getLocalStoragee == null) {
        shoppingCartListItem = [];
    } else {
        shoppingCartListItem = JSON.parse(getLocalStoragee);
    }
    let x, y;
    Object.values(found).forEach(s => {
        x = s.name;});
    Object.values(found).forEach(s => {
        y = s.price;});
    let temp = {
        id: Date.now(),
        name: x,
        price: y
    };
    shoppingCartListItem.unshift(temp);
    localStorage.setItem("shoppingCartListItem", JSON.stringify(shoppingCartListItem));
    showShoppingCartList();
}

//SHOW PRODUCT TO SHOPPING CART
function showShoppingCartList() {
    let totalPrice = 0
    let getLocalStoragee = localStorage.getItem("shoppingCartListItem");
    if(getLocalStoragee == null) {
        shoppingCartListItem = [];
    } else {
        shoppingCartListItem = JSON.parse(getLocalStoragee);
    }
    let newElement = '';

    shoppingCartListItem.forEach((element, index)=>{
        totalPrice += parseInt(element.price);
        newElement += '<div class="shopping-cart-item">'+
        `<h3 class="title">${element.name}</h3>`+
        `<p class="price">Price: ${element.price}$</p>`+
        `<div class="close-btn" onclick = "deleteItemFromShoppingCart(${index})">`+
            '<svg height="15px" viewBox="0 0 329.26933 329" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>'+
        '</div>'+
    '</div>';
    });
    document.getElementById("shopping-cart-container").innerHTML = newElement;
    document.getElementById("total-price").innerHTML = `Total price: ${totalPrice} $`;
}

//DELETE ITEM FROM SHOPPING CART
function deleteItemFromShoppingCart(index) {
    let getLocalStorageData = localStorage.getItem("shoppingCartListItem");
    shoppingCartListItem = JSON.parse(getLocalStorageData);
    shoppingCartListItem.splice(index, 1);
    localStorage.setItem("shoppingCartListItem", JSON.stringify(shoppingCartListItem));
    showShoppingCartList();
}