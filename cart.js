let basketContainer = document.querySelector(".basket_container");
let totalPrice = document.querySelector(".total_price");

console.log(basket);


function showBasket(arr) {
  basketContainer.innerHTML = "";
  let sumArr = [];
  let  sum = 0;
  if (arr.length === 0) {
    basketContainer.innerHTML = "Səbətdə mal mövcud deyil";
    
  }
  arr.forEach((data) => {
    basketContainer.innerHTML += `
      <div class="basket_card">
        <div class="basket_img">
          <img src="${data.image}">
        </div>  
        <div class="basket_content">
          <p>${data.title}</p>
          <p>Price:${data.price * data.count} &#8380; </p>
          <button onclick="inc(${data.id})">+</button>
          <p>${data.count}</p>
          <button onclick="dec(${data.id})">-</button>  
          <button onclick="del(${
            data.id
          })"><img src='https://kontakt.az/wp-content/themes/kontakt8/ktn-assets/assets/bin.png'></button>         
        </div>    
      </div>
    `;
    sumArr.push(data.price * data.count);
  });
  for (let i = 0; i < sumArr.length; i++) {
    sum += sumArr[i];
  }
  totalPrice.innerHTML = `Məhsullar: ${Math.round(sum)} &#8380;`;
}

function del(id) {
  let index = basket.findIndex((data) => data.id === id);
  basket.splice(index, 1);
  showBasket(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
}

function inc(x) {
  console.log(x);
  let chekBasket = basket.find((data) => data.id === x);
  chekBasket.count += 1;
  showBasket(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
}
function dec(y) {
  console.log(y);
  let chekBasket = basket.find((data) => data.id === y);
  chekBasket.count -= 1;
  showBasket(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
  if (chekBasket.count === 0) {
    let index = basket.findIndex((data) => data.id === y);
    basket.splice(index, 1);
    showBasket(basket);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}

window.addEventListener("load", () => {
  showBasket(basket);
});
