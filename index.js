// Declare variables
// Pages
let signInPage = document.getElementById("sign-in");
let signUpPage = document.getElementById("sign-up");

// Sign-in inputs
let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");
let btnSignIn = document.getElementById("btnSignIn");

// Sign-up inputs
let usernameSignUp = document.getElementById("usernameSignUp");
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let btnSignUp = document.getElementById("btnSignUp");

// content
let restricted = document.querySelectorAll("restricted");

// Data arrays
let users = [];
let cart = [];
let currentUser = [];

// Save users to local storage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}
// save the currentuser cart data
function saveCart() {
  if (currentUser) {
    const userIndex = users.findIndex((user) => {
      return user.userEmail == currentUser.userEmail;
    });
    console.log(userIndex);

    if (userIndex !== -1) {
      console.log(cart);

      currentUser.cart = cart;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      users[userIndex].cart = currentUser.cart;
      console.log(userIndex);

      saveUsers();
    }
  }
}
// Get users from local storage
function getUsers() {
  let usersData = localStorage.getItem("users");
  if (usersData) {
    users = JSON.parse(usersData);
  }
}

// get the cart data of the current user
function getCart() {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    cart = currentUser.cart || [];
  } else {
    currentUser = null;
    cart = [];
  }
}
// Validate inputs
function validateInputs(user, users = []) {
  //regex
  let regex = {
    usernameSignUp: /^[0-9A-Za-z]{6,16}$/,
    signUpEmail: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    signUpPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
  };
  //error messages
  let errorMessages = {
    usernameSignUp:
      "Username must be 6-16 characters long and contain only letters and numbers.",
    signUpEmail: "Please enter a valid email address.",
    emailExists: "This email is already in use. Please use a different email.",
    signUpPassword:
      "Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
  };
  // element created
  let errorElement = document.getElementById(user.id + "Error");
  if (regex[user.id].test(user.value)) {
    if (user.id === "signUpEmail") {
      let emailExists = users.some((existingUser) => {
        return existingUser.userEmail === user.value;
      });

      if (emailExists) {
        errorElement.style.display = "block";
        errorElement.textContent = errorMessages.emailExists;
        return false;
      }
    }
    errorElement.style.display = "none";
    return true;
  } else {
    errorElement.style.display = "block";
    errorElement.textContent = errorMessages[user.id];

    return false;
  }
}

// Clear inputs
function clearInputs() {
  usernameSignUp.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signInEmail.value = "";
  signInPassword.value = "";
}

// Sign-up function
function signUp() {
  if (
    validateInputs(usernameSignUp, users) &&
    validateInputs(signUpEmail, users) &&
    validateInputs(signUpPassword, users)
  ) {
    let newUser = {
      userName: usernameSignUp.value,
      userEmail: signUpEmail.value,
      userPassword: signUpPassword.value,
      cart: [],
    };

    users.push(newUser);
    saveUsers();
    clearInputs();
    goToSignIn();
  } else {
    document.getElementById("invalidsign").classList.remove("hidden");
  }
}

// Load users when the page loads
getUsers();

// Assign the sign-up function to the sign-up button
btnSignUp.onclick = () => signUp();

// go to sign in page

function goToSignIn() {
  signUpPage.classList.add("hidden");
  signInPage.classList.remove("hidden");
}

// sign in
function validateLogInInputs(email, password) {
  for (let i = 0; i < users.length; i++) {
    console.log(email);

    if (users[i].userEmail === email && users[i].userPassword == password) {
      console.log(users);
      return users[i];
    }
  }
  return null;
}
function signIn() {
  email = signInEmail.value;

  password = signInPassword.value;
  let user = validateLogInInputs(email, password);

  if (user) {
    currentUser = user;
    clearInputs();
    localStorage.setItem("isLoggedIn", "true");
    window.location.reload();
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    getCart();
    displayCart();
  } else {
    document.getElementById("invalidsign").classList.remove("hidden");
  }
}

btnSignIn.onclick = () => signIn();

function signOut() {
  if (currentUser) {
    saveCart();
  }
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("currentUser");
  cart = [];
  currentUser = null;
  window.location.reload();
}

document.getElementById("btn-logout").onclick = () => signOut();

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn === "false") {
    document.querySelectorAll(".restricted").forEach((element) => {
      element.style.display = "none";
    });
    signUpPage.classList.remove("hidden");
    document.getElementById("nav-signin").classList.remove("hidden");
    document.getElementById("nav-signup").classList.remove("hidden");
  } else {
    signInPage.classList.add("hidden");
    signUpPage.classList.add("hidden");
    document.getElementById("nav-signin").classList.add("hidden");
    document.getElementById("nav-signup").classList.add("hidden");

    document.querySelectorAll(".restricted").forEach((element) => {
      element.style.display = "block";
    });
  }
});
document.getElementById("nav-signin").addEventListener("click", () => {
  signUpPage.classList.add("hidden");
  signInPage.classList.remove("hidden");
});

document.getElementById("nav-signup").addEventListener("click", () => {
  signInPage.classList.add("hidden");
  signUpPage.classList.remove("hidden");
});

//=====================================================================================================================

const products = [
  {
    id: 0,
    name: `BOUQUET №1`,
    price: "20 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town.  ",
    image: "./assets/1.png",
  },
  {
    id: 1,
    name: `BOUQUET №2`,
    price: "30 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/2.png",
  },
  {
    id: 2,
    name: `BOUQUET №3`,
    price: "50 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town.  ",
    image: "./assets/3.png",
  },
  {
    id: 3,
    name: `BOUQUET №4`,
    price: "30 USD",
    disc: "It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/4.png",
  },
  {
    id: 4,
    name: `BOUQUET №5`,
    price: "40 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town. ",
    image: "./assets/5.png",
  },
  {
    id: 5,
    name: `BOUQUET №6`,
    price: "50 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/6.png",
  },
  {
    id: 6,
    name: `BOUQUET №7`,
    price: "30 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town. ",
    image: "./assets/7.jpeg",
  },
  {
    id: 7,
    name: `BOUQUET №8`,
    price: "80 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/8.jpeg",
  },
  {
    id: 8,
    name: `BOUQUET №9`,
    price: "30 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town. ",
    image: "./assets/9.webp",
  },
  {
    id: 9,
    name: `BOUQUET №10`,
    price: "60 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town. ",
    image: "./assets/10.webp",
  },
  {
    id: 10,
    name: `BOUQUET №11`,
    price: "30 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town.",
    image: "./assets/11.webp",
  },
  {
    id: 11,
    name: `BOUQUET №12`,
    price: "40 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/12.webp",
  },
  {
    id: 12,
    name: `BOUQUET №13`,
    price: "75 USD",
    disc: "Brighten someone’s day or style out your own space with the cutest flower wrap around town. ",
    image: "./assets/13.jpeg",
  },
  {
    id: 13,
    name: `BOUQUET №14`,
    price: "30 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/14.jpg",
  },
  {
    id: 14,
    name: `BOUQUET №15`,
    price: "80 USD",
    disc: " It’s always a great day for fresh flowers, and we’ve got the sweetest blooms to deliver sunshine to your door. ",
    image: "./assets/15.jpg",
  },
];
// Function to display product cards in the product display section
function displayProductCards() {
  const productDisplay = document.getElementById("cart");
  productDisplay.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productHTML = `
      <div class="card col-md-3 p-0">
        <div class="card-img">
          <img src="${product.image}" alt="${product.name}" class="w-100 object-fit-cover" />
        </div>
        <div class="card-content text-center d-flex flex-column py-2 justify-content-between">
          <h4>${product.name}</h4>
          <span>${product.price}</span>
          <p class="text-start px-3 py-2" >${product.disc}</p>
          <button class="btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;

    productDisplay.innerHTML += productHTML;
  });
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => addProductToCart(button.dataset.id));
  });
}
displayProductCards();

function addProductToCart(productId) {
  const product = products.find((p) => p.id == productId);
  if (product) {
    cart.push(product);
    saveCart();

    displayCart();
  } else {
    console.log("Product not found");
  }
}

// Function to display cart items
function displayCart() {
  const cartDisplay = document.getElementById("cart-section");
  cartDisplay.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((product, index) => {
    const productHTML = `
      <div class="cart-item col-md-6 ">
        <img src="${product.image}" alt="${product.name}" class="cart-item-image" />
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <span>${product.price}</span>
                    <button class="rounded-2 btn btn-danger" onclick="removeProductFromCart(${index})" class="remove-button">Remove</button>
        </div>
      </div>
    `;
    cartDisplay.innerHTML += productHTML;

    // Calculate total price
    const productPrice = parseFloat(product.price.replace(" USD", ""));
    totalPrice += productPrice;
  });

  // Display total price
  const totalHTML = `<h3 class="restricted">Total Price: ${totalPrice.toFixed(
    2
  )} USD</h3>`;
  cartDisplay.innerHTML += totalHTML;
}

// Call displayCart to display items when the user logs in
if (currentUser) {
  getCart();
  displayCart();
}
function removeProductFromCart(index) {
  cart.splice(index, 1); // Remove the product from the cart array based on the index
  saveCart(); // Save the updated cart to localStorage
  displayCart(); // Update the cart display
}

if (
  localStorage.getItem("isLoggedIn") === "true" &&
  localStorage.getItem("currentUser")
) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  getCart();
  displayCart();
}
