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

//render items
function renderItems() {
  app.innerHTML = "";
  const items = getItems();

  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "single-item";
    div.dataset.id = item.id;

    //elemen to append for rendering
    div.innerHTML = `
      <input type="checkbox" ${item.completed ? "checked" : ""} />
      <p class="${item.completed ? "completed" : ""}">
        ${item.name}
      </p>
      <button class="btn icon-btn edit-btn" type="button">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="btn icon-btn remove-btn" type="button">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    `;

    app.appendChild(div);
  });
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
  renderItems();
});

app.addEventListener("change", (e) => {
  if (e.target.type !== "checkbox") return;

  const id = e.target.closest(".single-item").dataset.id;

  const items = getItems().map((item) =>
    item.id === id ? { ...item, completed: e.target.checked } : item,
  );

  saveItems(items);
  renderItems();
});

//render items from local storage on page load
document.addEventListener("DOMContentLoaded", renderItems);
