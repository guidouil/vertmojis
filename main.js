let vertmojis;
let vertmojisData;

// Wait for the DOM to be fully loaded before loading the JSON
document.addEventListener("DOMContentLoaded", async function () {
  // Load the JSON data
  vertmojis = await fetch("./vertmojis.json");
  vertmojisData = await vertmojis.json();
  console.dir(vertmojisData);
  // For each trio, create a button to copy the trio and put it in the div with id "trios"
  // Button must be inside an article with appropriate classes
  vertmojisData.trios.forEach((trio) => {
    const article = document.createElement("article");
    article.classList.add(
      "s3",
      "m3",
      "l1",
      "middle-align",
      "center-align",
      "small"
    );
    const button = document.createElement("button");
    button.classList.add("circle", "transparent", "large");
    button.innerHTML = `<code class="transparent" style="font-size: 3rem;">${trio}</code>`;
    article.addEventListener("click", () => {
      navigator.clipboard.writeText(trio);
      document.getElementById("toastSuccessMessage").textContent =
        "Copied to clipboard";
      ui("#toastSuccess");
    });
    article.appendChild(button);
    document.getElementById("trios").appendChild(article);
  });

  // Select fields should be loaded from the JSON data
  const selectEyes = document.getElementById("eyes");
  const selectNoses = document.getElementById("noses");
  const selectMouths = document.getElementById("mouths");
  vertmojisData.eyes.forEach((eye) => {
    selectEyes.innerHTML += `<option value="${eye}">${eye}</option>`;
  });
  vertmojisData.noses.forEach((nose) => {
    selectNoses.innerHTML += `<option value="${nose}">${nose}</option>`;
  });
  vertmojisData.mouths.forEach((mouth) => {
    selectMouths.innerHTML += `<option value="${mouth}">${mouth}</option>`;
  });

  // Call shuffleFace on page load to generate a random face
  shuffleFace();
});

function updateFace() {
  const eyes = document.getElementById("eyes").value;
  const noses = document.getElementById("noses").value;
  const mouths = document.getElementById("mouths").value;
  document.getElementById("face-eyes").innerHTML = eyes;
  document.getElementById("face-nose").innerHTML = noses;
  document.getElementById("face-mouth").innerHTML = mouths;
}

function copyFace() {
  const eyes = document.getElementById("face-eyes").innerHTML;
  const noses = document.getElementById("face-nose").innerHTML;
  const mouths = document.getElementById("face-mouth").innerHTML;
  navigator.clipboard.writeText(`${eyes}\n${noses}\n${mouths}`);
  document.getElementById("toastSuccessMessage").textContent =
    "Copied to clipboard";
  ui("#toastSuccess");
}

function shuffleFace() {
  const eyesArray = vertmojisData.eyes;
  const nosesArray = vertmojisData.noses;
  const mouthsArray = vertmojisData.mouths;
  const randomEyes = eyesArray[Math.floor(Math.random() * eyesArray.length)];
  const randomNoses = nosesArray[Math.floor(Math.random() * nosesArray.length)];
  const randomMouths =
    mouthsArray[Math.floor(Math.random() * mouthsArray.length)];
  document.getElementById("face-eyes").innerHTML = randomEyes;
  document.getElementById("face-nose").innerHTML = randomNoses;
  document.getElementById("face-mouth").innerHTML = randomMouths;

  // Update the selectors to match the randomly chosen emojis
  document.getElementById("eyes").value = randomEyes;
  document.getElementById("noses").value = randomNoses;
  document.getElementById("mouths").value = randomMouths;
}
