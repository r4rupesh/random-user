// Select the element with the class "name"
let fullName = document.querySelector(".name");
let email = document.querySelector(".email");
let phone = document.querySelector(".phone");
let image = document.querySelector(".image");
let gender = document.querySelector(".gender");
let age = document.querySelector(".age");
let dob = document.querySelector(".dob");
let address = document.querySelector(".address");
let button = document.querySelector(".random");

// Define the asynchronous function to fetch data
const getData = async () => {
  const url = "https://randomuser.me/api/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json.results[0]); // Logs the user data for debugging
    return json.results[0]; // Return the user data
  } catch (error) {
    console.error(error.message);
    return null; // Return null in case of error
  }
};

// Update the DOM with fetched data
const extractData = async () => {
  const userData = await getData();
  image.src = userData.picture.large;
  console.log(userData);
  fullName.innerHTML = `<i class="fa-solid fa-user"></i>${userData.name.title} ${userData.name.first} ${userData.name.last}`;
  email.innerHTML = `<i class="fa-solid fa-envelope"></i> ${userData.email}`;
  phone.innerHTML = `<i class="fa-solid fa-phone"></i> ${userData.phone}`;
  if (userData.gender === "male") {
    gender.innerHTML = `<i class="fa-solid fa-person"></i> ${userData.gender}`;
  } else {
    gender.innerHTML = `<i class="fa-solid fa-person-dress"></i> ${userData.gender}`;
  }

  age.innerHTML = `<i class="fa-solid fa-face-smile"></i> ${userData.dob.age} years`;
  dob.innerHTML = `<i class="fa-solid fa-cake-candles"></i> ${new Date(
    userData.dob.date
  ).toLocaleDateString()}`;
  address.innerHTML = `<i class="fa-solid fa-globe"> </i>${userData.location.country}`;
};
extractData();

button.addEventListener("click", extractData);
