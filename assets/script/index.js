"use strict";

const usersContainer = document.querySelector(".users-container");
const spinner = document.querySelector(".spinner");

const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  mode: "cors",
};

async function getUsers() {
  try {
    const result = await fetch(URL, options);
    if (!result.ok) {
      throw new Error(`${result.statusText} (${result.status})`);
    }

    const users = await result.json();
    const list = users.results;
    setUsers(list);
    console.log(list);
  } catch (error) {
    console.error(error.message);
  }
}

function setUsers(users) {
  // Show the spinner while data is loading
  showSpinner();

  // Clear existing content in the usersContainer
  usersContainer.innerHTML = "";

  // Create and append <li> elements for each user
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name.first} ${user.name.last} - ${user.email}`;
    usersContainer.appendChild(li);

    // Create and append <img> elements for each user
    const img = document.createElement("img");
    img.src = user.picture.thumbnail;
    img.alt = `${user.name.first} ${user.name.last}`;
    usersContainer.appendChild(img);
  });

  // Hide the spinner after data is loaded
  hideSpinner();
}

function showSpinner() {
  spinner.style.display = "block";
}

function hideSpinner() {
  spinner.style.display = "none";
}

// Fetch and display users on page load
getUsers();
