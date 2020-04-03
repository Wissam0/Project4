import {
  checkForUrl
} from "./urlChecker";

async function handleSubmit(event) {
  event.preventDefault();
  const inputUrl = document.getElementById("name").value;
  const result1UI = document.getElementById("results1");
  const result2UI = document.getElementById("results2");
  const result3UI = document.getElementById("results3");
  const result4UI = document.getElementById("results4");

  if (!checkForUrl(inputUrl)) {
    resultUI.textContent = "Not a valid url.";
    return;
  }

  const urlData = {
    url: inputUrl
  };

  const res = await postData("http://localhost:4000/postURL", urlData);
  result1UI.textContent = res.msg;
  result2UI.textContent = `The polarity is ${res.pol}`;
  result3UI.textContent = `The polarity confidence is ${res.con}`;
  result4UI.textContent = `The text is : ....... ${res.txt}`;
  
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