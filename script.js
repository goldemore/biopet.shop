let trendGridContainer = document.querySelector(".trend_grid_container");
let productsContainer = document.querySelector(".products_container");

let userName = document.querySelector(".user_name");

if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "./login/login.html";
}

let getLoggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
userName.innerHTML = getLoggedInUser.userName;

let exit = document.querySelector(".exit");
exit.addEventListener("click", () => {
  window.location.href = "./login/login.html";
  localStorage.removeItem("loggedInUser");
});

fetch("./api/yeniTrend.json")
  .then((resp) => resp.json())
  .then((data) => {
    data.forEach((product) => {
      trendGridContainer.innerHTML += `
        <div class="trend_grid_card">
  <div class="img_content">
    <div class="heart_icon">
      <svg
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1046 9.26959C22.2642 7.14738 22.2642 3.69662 20.1046 1.59166C17.9451 -0.530554 14.4336 -0.530554 12.2741 1.59166L11.2206 2.62689L10.1672 1.59166C8.00763 -0.530554 4.49616 -0.530554 2.35417 1.59166C1.30073 2.60963 0.738892 3.98994 0.738892 5.43925C0.738892 6.88857 1.31828 8.25162 2.35417 9.28684L11.2206 18L20.1046 9.26959ZM2.12592 5.43925C2.12592 4.35227 2.5473 3.33429 3.33738 2.57513C4.14502 1.78145 5.19846 1.38462 6.2519 1.38462C7.30534 1.38462 8.35878 1.78145 9.16642 2.57513L11.2206 4.57656L13.2748 2.55787C14.8901 0.970525 17.5062 0.970525 19.1039 2.55787C19.8764 3.31704 20.3153 4.33501 20.3153 5.422C20.3153 6.50899 19.894 7.52696 19.1039 8.28613L11.2206 16.0503L3.33738 8.30338C2.56486 7.52696 2.12592 6.50899 2.12592 5.43925Z"
          fill="black"
        />
      </svg>
    </div>
    <img src="${product.image}" alt="" />
    <button onclick="addToCard(${product.id})">
      İndi al
      <svg
        width="21"
        height="17"
        viewBox="0 0 21 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.47245 0H3.83407C3.85639 0 3.87534 0.0102163 3.89705 0.012459C3.94233 0.016994 3.98467 0.0243697 4.02711 0.0382241C4.06264 0.0497361 4.09471 0.0639393 4.12709 0.0811826C4.16435 0.101067 4.19794 0.122646 4.23042 0.149508C4.26031 0.174126 4.28567 0.20034 4.31037 0.229893C4.33584 0.260342 4.35759 0.29134 4.37691 0.326624C4.39688 0.362855 4.41091 0.400032 4.42316 0.4402C4.42982 0.461978 4.4442 0.479471 4.44847 0.502345L4.80614 2.41898L20.0902 3.29475C20.1487 3.29076 20.2004 3.29913 20.2658 3.30511C20.6054 3.33541 20.8575 3.62725 20.8322 3.96055C20.8302 3.98567 20.827 4.00999 20.8221 4.03391L19.7572 9.72875C19.5136 10.6118 18.7634 11.5033 17.635 11.5033H6.50152L6.7399 12.7807H16.1082C17.2943 12.7807 18.2596 13.7272 18.2596 14.8902C18.2596 16.0535 17.2943 17 16.1082 17C14.9221 17 13.9568 16.0535 13.9568 14.8902C13.9568 14.5732 14.0336 14.2754 14.1619 14.0055H8.40916C8.53745 14.2754 8.61425 14.5732 8.61425 14.8902C8.61425 16.0535 7.64894 17 6.46285 17C5.27675 17 4.31144 16.0535 4.31144 14.8902C4.31144 14.0632 4.80395 13.3531 5.51238 13.0075L3.31345 1.22477H1.47245C1.12764 1.22477 0.847886 0.950469 0.847886 0.612383C0.847886 0.274296 1.12764 0 1.47245 0ZM5.82598 7.88338L8.47265 7.92415L8.3285 6.4202L5.53759 6.33817L5.82598 7.88338ZM19.0482 6.73531L16.4034 6.65757L16.2304 8.04355L18.7966 8.08307L19.0482 6.73531ZM15.5679 6.633L12.6609 6.54758V7.98858L15.3934 8.0307L15.5679 6.633ZM12.6609 5.73032L15.6696 5.81878L15.8618 4.27935L12.6609 4.09586V5.73032ZM11.8281 4.04812L8.92165 3.88146L9.08877 5.62532L11.8281 5.70585V4.04812ZM12.6609 8.80529V10.2785H15.1127L15.2916 8.84581L12.6609 8.80529ZM11.8281 8.79249L9.3887 8.75496L9.53473 10.2785H11.8281V8.79249ZM11.8281 7.97578V6.52311L9.1673 6.44487L9.31033 7.937L11.8281 7.97578ZM5.38425 5.51643L8.24997 5.60065L8.08062 3.83327L5.03755 3.6588L5.38425 5.51643ZM16.6945 4.3271L16.5051 5.8433L19.2 5.92254C19.3136 5.31763 19.404 4.84753 19.4811 4.48682L16.6945 4.3271ZM18.5397 9.45884L18.6446 8.89744L16.1286 8.85872L15.9513 10.2785H17.635C18.1701 10.2785 18.4682 9.71001 18.5397 9.45884ZM8.69827 10.2785L8.55102 8.74205L5.97882 8.70243L6.27296 10.2785H8.69827V10.2785ZM15.2059 14.8902C15.2059 15.3781 15.6105 15.7752 16.1082 15.7752C16.6059 15.7752 17.0105 15.3781 17.0105 14.8902C17.0105 14.4022 16.6059 14.0055 16.1082 14.0055C15.6105 14.0055 15.2059 14.4022 15.2059 14.8902ZM6.46285 15.7752C6.96054 15.7752 7.36513 15.3781 7.36513 14.8902C7.36513 14.4022 6.96054 14.0055 6.46285 14.0055C5.96515 14.0055 5.56056 14.4022 5.56056 14.8902C5.56056 15.3781 5.96515 15.7752 6.46285 15.7752Z"
          fill="#1D1D1B"
        />
      </svg>
    </button>
  </div>
  <div class="p_content">
    <p>
      ${product.title} <b> ${product.price} &#8380; </b>
    </p>
  </div>
</div> `;
    });
  });

fetch("./apiNew/trendMeh.json")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((product) => {
      productsContainer.innerHTML += `
      <div class="product_card" data-name="${product.dataName}">
            <img
              src="${product.image}"
              alt=""
            />
            <div class="p_plus_price">
              <p>${product.title}</p>
              <p><b>${product.price} &#8380; </b></p>
            </div>

            <div class="btn_heart">
              <button onclick="addToCardNew(${product.id})">
                İndi al
                <svg
                  width="21"
                  height="17"
                  viewBox="0 0 21 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.47245 0H3.83407C3.85639 0 3.87534 0.0102163 3.89705 0.012459C3.94233 0.016994 3.98467 0.0243697 4.02711 0.0382241C4.06264 0.0497361 4.09471 0.0639393 4.12709 0.0811826C4.16435 0.101067 4.19794 0.122646 4.23042 0.149508C4.26031 0.174126 4.28567 0.20034 4.31037 0.229893C4.33584 0.260342 4.35759 0.29134 4.37691 0.326624C4.39688 0.362855 4.41091 0.400032 4.42316 0.4402C4.42982 0.461978 4.4442 0.479471 4.44847 0.502345L4.80614 2.41898L20.0902 3.29475C20.1487 3.29076 20.2004 3.29913 20.2658 3.30511C20.6054 3.33541 20.8575 3.62725 20.8322 3.96055C20.8302 3.98567 20.827 4.00999 20.8221 4.03391L19.7572 9.72875C19.5136 10.6118 18.7634 11.5033 17.635 11.5033H6.50152L6.7399 12.7807H16.1082C17.2943 12.7807 18.2596 13.7272 18.2596 14.8902C18.2596 16.0535 17.2943 17 16.1082 17C14.9221 17 13.9568 16.0535 13.9568 14.8902C13.9568 14.5732 14.0336 14.2754 14.1619 14.0055H8.40916C8.53745 14.2754 8.61425 14.5732 8.61425 14.8902C8.61425 16.0535 7.64894 17 6.46285 17C5.27675 17 4.31144 16.0535 4.31144 14.8902C4.31144 14.0632 4.80395 13.3531 5.51238 13.0075L3.31345 1.22477H1.47245C1.12764 1.22477 0.847886 0.950469 0.847886 0.612383C0.847886 0.274296 1.12764 0 1.47245 0ZM5.82598 7.88338L8.47265 7.92415L8.3285 6.4202L5.53759 6.33817L5.82598 7.88338ZM19.0482 6.73531L16.4034 6.65757L16.2304 8.04355L18.7966 8.08307L19.0482 6.73531ZM15.5679 6.633L12.6609 6.54758V7.98858L15.3934 8.0307L15.5679 6.633ZM12.6609 5.73032L15.6696 5.81878L15.8618 4.27935L12.6609 4.09586V5.73032ZM11.8281 4.04812L8.92165 3.88146L9.08877 5.62532L11.8281 5.70585V4.04812ZM12.6609 8.80529V10.2785H15.1127L15.2916 8.84581L12.6609 8.80529ZM11.8281 8.79249L9.3887 8.75496L9.53473 10.2785H11.8281V8.79249ZM11.8281 7.97578V6.52311L9.1673 6.44487L9.31033 7.937L11.8281 7.97578ZM5.38425 5.51643L8.24997 5.60065L8.08062 3.83327L5.03755 3.6588L5.38425 5.51643ZM16.6945 4.3271L16.5051 5.8433L19.2 5.92254C19.3136 5.31763 19.404 4.84753 19.4811 4.48682L16.6945 4.3271ZM18.5397 9.45884L18.6446 8.89744L16.1286 8.85872L15.9513 10.2785H17.635C18.1701 10.2785 18.4682 9.71001 18.5397 9.45884ZM8.69827 10.2785L8.55102 8.74205L5.97882 8.70243L6.27296 10.2785H8.69827V10.2785ZM15.2059 14.8902C15.2059 15.3781 15.6105 15.7752 16.1082 15.7752C16.6059 15.7752 17.0105 15.3781 17.0105 14.8902C17.0105 14.4022 16.6059 14.0055 16.1082 14.0055C15.6105 14.0055 15.2059 14.4022 15.2059 14.8902ZM6.46285 15.7752C6.96054 15.7752 7.36513 15.3781 7.36513 14.8902C7.36513 14.4022 6.96054 14.0055 6.46285 14.0055C5.96515 14.0055 5.56056 14.4022 5.56056 14.8902C5.56056 15.3781 5.96515 15.7752 6.46285 15.7752Z"
                    fill="#1D1D1B"
                  />
                </svg>
              </button>
              <div class="svg_heart">
                <svg
                  width="19"
                  height="15"
                  viewBox="0 0 19 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.3458 7.72466C19.1968 5.95615 19.1968 3.08052 17.3458 1.32638C15.4947 -0.442128 12.4849 -0.442128 10.6339 1.32638L9.73092 2.18907L8.82797 1.32638C6.97693 -0.442128 3.9671 -0.442128 2.1311 1.32638C1.22815 2.17469 0.746582 3.32495 0.746582 4.53271C0.746582 5.74047 1.2432 6.87635 2.1311 7.73904L9.73092 15L17.3458 7.72466ZM1.93546 4.53271C1.93546 3.62689 2.29664 2.77858 2.97386 2.14594C3.66612 1.48454 4.56906 1.15385 5.47201 1.15385C6.37496 1.15385 7.27791 1.48454 7.97017 2.14594L9.73092 3.8138L11.4917 2.13156C12.8762 0.808771 15.1185 0.808771 16.488 2.13156C17.1501 2.7642 17.5264 3.61251 17.5264 4.51833C17.5264 5.42416 17.1652 6.27247 16.488 6.9051L9.73092 13.3753L2.97386 6.91948C2.31169 6.27247 1.93546 5.42416 1.93546 4.53271Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
      
      `;
    });

    let productCards = document.querySelectorAll(".product_card");

    let btns = document.querySelectorAll(".btn_3pc button");
    let btn3pc = document.querySelector(".btn_3pc");

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", () => {
        console.log(btns[i]);
        btn3pc.querySelector(".active").classList.remove("active");
        btns[i].classList.add("active");
        let filterBtn = btns[i].getAttribute("data-name");
        for (let i = 0; i < productCards.length; i++) {
          let filterProduct = productCards[i].getAttribute("data-name");

          console.log(filterBtn);
          console.log(filterProduct);
          if (filterBtn === filterProduct || filterBtn === "butunMehsul") {
            productCards[i].classList.add("show");
            productCards[i].classList.remove("hide");
          } else {
            productCards[i].classList.remove("show");
            productCards[i].classList.add("hide");
          }
        }
      });
    }
  });

function addToCard(id) {
  console.log(id);
  let chekBasket = basket.find((data) => data.id === id);
  if (chekBasket) {
    chekBasket.count += 1;
  } else {
    fetch("./api/yeniTrend.json")
      .then((resp) => resp.json())
      .then((products) => {
        let checkPr = products.find((data) => data.id === id);
        checkPr.count = 1;
        basket.push(checkPr);
        localStorage.setItem("basket", JSON.stringify(basket));
      });
  }
  console.log(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
}

function addToCardNew(id) {
  console.log(id);
  let chekBasket = basket.find((data) => data.id === id);
  if (chekBasket) {
    chekBasket.count += 1;
  } else {
    fetch("./apiNew/trendMeh.json")
      .then((resp) => resp.json())
      .then((products) => {
        console.log(products);
        let checkPr = products.find((data) => data.id === id);
        checkPr.count = 1;
        basket.push(checkPr);
        localStorage.setItem("basket", JSON.stringify(basket));
      });
  }
  console.log(basket);
  localStorage.setItem("basket", JSON.stringify(basket));
}

// First slider START

let sliderOneContainer = document.querySelector("#slider_one_container");
let leftArrow = document.querySelector(".left_arrow");
let rightArrow = document.querySelector(".right_arrow");

let count = 0;

function slider() {
  for (let i = 0; i < sliderOneContainer.children.length; i++) {
    sliderOneContainer.children[i].style.transform = `translateX(${
      -290 * count
    }px)`;
    sliderOneContainer.children[i].classList.remove("active_slider");
  }
  sliderOneContainer.children[count + 1].classList.add("active_slider");
}

leftArrow.addEventListener("click", () => {
  if (count > 0) {
    count--;
  } else {
    count = 0;
  }
  slider();
});

rightArrow.addEventListener("click", () => {
  if (count < sliderOneContainer.children.length - 3) {
    count++;
    slider();
  } else {
    count = 0;
    slider();
  }
});

setInterval(() => {
  if (count < sliderOneContainer.children.length - 3) {
    count++;
    slider();
  } else {
    count = 0;
    slider();
  }
}, 4000);

// Xidmətlərimiz section - SLIDER
let secondSlider = document.querySelector(".second_slider");
let leftArrow2 = document.querySelector(".left_arrow2");
let rightArrow2 = document.querySelector(".right_arrow2");

let count2 = 0;

function slider2() {
  for (let i = 0; i < secondSlider.children.length; i++) {
    secondSlider.children[i].style.transform = `translate(${-296 * count2}px)`;
  }
}
leftArrow2.addEventListener("click", () => {
  if (count2 > 0) {
    count2--;
  } else {
    secondSlider.children.length - 4;
  }
  slider2();
});
rightArrow2.addEventListener("click", () => {
  if (count2 > 0) {
    count2++;
  } else {
    secondSlider.children.length - 4;
  }
  slider2();
});

setInterval(() => {
  if (count2 < secondSlider.children.length - 4) {
    count2++;
    slider2();
  } else {
    count2 = 0;
    slider2();
  }
}, 4000);
