console.log("JS loaded");

const form = document.querySelector(".input-items");
const input = document.getElementById("item-input");
const app = document.querySelector(".app");

const STORAGE_KEY = "grocery_items";

function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

//add items to local storage
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  const items = getItems();
  items.push({
    id: Date.now().toString(),
    name: value,
    completed: false,
  });

  saveItems(items);
  input.value = "";
});
