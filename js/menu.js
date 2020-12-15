/**geting all products */
// let foods= [
//     {productname: 'Mazania', description:'A Wonderful Taste of Modern Italian Pizzaeria.', images:'mazania.jpg', price:'shs980'},
//     {productname: 'Mayonese', description:'A Dripping Crisp Mayonese Crunch Taste.', images:'mayonese.jpg', price:'shs5.05'},
//     { productname: 'Junkies', description:'A Splendid Taste of Sweetness and Crunchness.', images:'foo.jpg', price:'shs5.05'}
//     ];
    let productcont = document.querySelector('.productcont');

    Menu(foods);
 function Menu(foods){
    for(let i = 0; i < foods.length; i++) {
        //create elements
        let divProduct = document.createElement('div');
        let h3 = document.createElement('h3');
        let img = document.createElement('img');
        let p =  document.createElement('p');
        let pPrice = document.createElement('p');
        let btn = document.createElement('BUTTON');

        //setting attributes
        divProduct.setAttribute('class', 'product');
        h3.setAttribute('class','productname');
        pPrice.setAttribute('class', 'price');
        btn.setAttribute('class','addtocart');

        //adding items
        h3.innerText = foods[i].productname;
        img.setAttribute('src', 'img/productimg/'+ foods[i].images);
        img.setAttribute('class', 'card-img-top');
        p.innerText = foods[i].description;
        pPrice.innerText =foods[i].price;

        //adding innerHtml
        btn.textContent ='Add to Menu';

        divProduct.appendChild(h3);
        divProduct.appendChild(img);
        divProduct.appendChild(p);
        divProduct.appendChild(pPrice);
        divProduct.appendChild(btn);
        productcont.appendChild(divProduct);
    }

 }

 /**searching for the menu */
 function menuSearch(){

    let searchitem = document.querySelector('.searchItem').value;
   // alert(searchitem);
   let menu = foods.filter(menuitem => menuitem.productname.startsWith(`${searchitem}`));
   console.log(menu);   
  
  }
/* get cart total from session on load */
updateCartTotal();

/* button event listeners */
document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}

/* ADD TO CART functions */

function addToCart(elem) {
    //init
    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;
    //cycles siblings for product info near the add button
    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; // text node
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }
    //create product object
    var product = {
        productname : getproductName,
        price : getprice
    };
    //convert product data to JSON for storage
    var stringProduct = JSON.stringify(product);
    /*send product data to session storage */
    
    if(!sessionStorage.getItem('cart')){
        //append product JSON object to cart array
        cart.push(stringProduct);
        //cart to JSON
        stringCart = JSON.stringify(cart);
        //create session storage cart item
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
        //get existing cart data from storage and convert back into array
       cart = JSON.parse(sessionStorage.getItem('cart'));
        //append new product JSON object
        cart.push(stringProduct);
        //cart back to JSON
        stringCart = JSON.stringify(cart);
        //overwrite cart data in sessionstorage 
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}
/* Calculate Cart Total */
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('shs')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>shs." + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
//user feedback on successful add
function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}
/* User Manually empty cart */
function emptyCart() {
    //remove cart session storage object & refresh cart totals
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
      //clear message and remove class style
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}