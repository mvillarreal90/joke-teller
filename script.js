const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
      key: 'df5eb5bfd7404dc2ad5327c37c5a6792',
      src: joke,
      hl: 'en-us',
      r: 0,
      c: 'mp3',
      f: '44khz_16bit_stereo',
      ssml: false
    });
}

async function getJokesFromApi() {
  let joke = ''
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup}... ${data.delivery}`;
    } else {
      joke = data.joke
    }
    toggleButton();
    tellMe(joke);
  } catch(error) {
    console.log(error);
  }
}

button.addEventListener('click', getJokesFromApi);
audioElement.addEventListener('ended', toggleButton);