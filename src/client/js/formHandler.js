import {
  checkForUrl
} from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();
  const inputUrl = document.getElementById("name").value;
  const resultUI = document.getElementById("results");

  if (!checkForUrl(inputUrl)) {
    resultUI.textContent = "Not a valid url.";
    return;
  }

  const urlData = {
    url: inputUrl
  };

  const res = await postData("/infoURL", urlData);
  resultUI.textContent = `The polarity is ${res.pol} and 
  polarity confidence is ${res.con}`;
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export {
  handleSubmit,
  postData
};