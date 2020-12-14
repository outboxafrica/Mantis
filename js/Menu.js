
//fn to get all foods
function allMenu(menu){
  let container = document.querySelector('.container');

  for(let i = 0; i<menu.length; i++){
    //creating the html tags
    let cardDiv = document.createElement('div');
    let boxDiv =  document.createElement('div');
    let a = document.createElement('a');
    let newImg = document.createElement('img');

    //adding the imgs 
    newImg.setAttribute('src', 'img/lunch/'+ menu[i].images);
    newImg.setAttribute('alt', menu[i].alt);
    newImg.setAttribute('class', 'foodImg');

    //adding anchor tags
    a.innerHTML = menu[i].dish;
    a.setAttribute('href', '#');
    a.setAttribute('class', 'menuNavs');


    //assign class to them
    cardDiv.setAttribute('class', 'card');
    boxDiv.setAttribute('class', 'box');

    //appending
    boxDiv.appendChild(newImg);
    boxDiv.appendChild(a);
    cardDiv.appendChild(boxDiv);
    container.appendChild(cardDiv);
  }
}

function menuSearch(){
  alert('he');

}