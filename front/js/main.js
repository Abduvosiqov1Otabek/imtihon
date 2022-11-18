const fileInput = document.querySelector("#fileInput");
const titleInput = document.querySelector("#fileName");
const button = document.querySelector("#btn");
const form = document.querySelector("#form");
const host = "http://localhost:5500";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData();

  formData.append("file", fileInput.files[0]);
  formData.append("title", titleInput.value);

  const response = await fetch(host + "/upload", {
    method: "POST",
    body: formData,
  });

  console.log(response);
  fileInput.files = null;
  titleInput.value = null;

  renderData();
});

async function renderData() {
  const ul = document.querySelector("#list");
  const response = await fetch(host + "/files");
  const files = await response.json();

  ul.innerHTML = null;
  for (let file of files) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const img = document.createElement("img");
    const a = document.createElement("a");

    h3.textContent = file.title;
    a.textContent = "Downloads";

    img.setAttribute("src", host + "/" + file.path);
    img.setAttribute("width", 200);
    a.setAttribute("href", host + "/downloads/" + file.path);

    li.append(h3, img, a);
    ul.append(li);
  }
}

renderData();
