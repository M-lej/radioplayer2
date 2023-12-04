// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'
const channelContainer = document.getElementById("channels");

async function getRadio() {
  let data = await fetch("https://api.sr.se/api/v2/channels/?format=json");
  let response = await data.json();

  console.log("response", response);
  console.log("data", data);

  // Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.
  response.channels.forEach((radioChannels) => {
    const radioImage = document.createElement("div");
    radioImage.setAttribute("class", "image-container");
    radioImage.innerHTML = `<img class ="image" src = "${radioChannels.image}"/>`;
    channelContainer.appendChild(radioImage);

    const radioText = document.createElement("div");
    radioText.setAttribute("class", "text-container");
    radioText.innerHTML = `<h1>${radioChannels.name}</h1>`;
    channelContainer.appendChild(radioText);

    const radioAudio = document.createElement("AUDIO");
    radioAudio.controls = true;
    const radioSourceAudio = document.createElement("source");
    radioSourceAudio.src = radioChannels.liveaudio.url;
    radioSourceAudio.type = "audio/mpeg";
    radioImage.style.backgroundColor = `#${radioChannels.color}`;
    radioAudio.style.backgroundColor = `#${radioChannels.color}`;

    radioAudio.appendChild(radioSourceAudio);
    channelContainer.appendChild(radioAudio);

    console.log(radioChannels.liveaudio.url);
  });
}

getRadio();

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>
