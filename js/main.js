let inputField = document.querySelector(".get-data input"),
  getButton = document.querySelector(".get-data .get-button"),
  displayData = document.querySelector(".show-data");

getButton.addEventListener("click", getData);

function getData() {
  if (inputField.value === "") {
    checkEmpty();
  } else {
    let resource = inputField.value.trim(),
      resourceUrl = `https://jsonplaceholder.typicode.com/${resource}`;

    fetch(resourceUrl)
      .then((response) => response.json())
      .then((resources) => {
        if (resources.length > 0) {
          deleteDefaultMsg();
          resources.forEach((resource) => {
            extractData(resource);
          });
        } else {
          checkEmpty();
        }
      });
  }
  inputField.value = "";
}

function checkEmpty() {
  let msgAlertContainer = document.createElement("span");
  let msgAlert = document.createTextNode(
    "Please Write JSONPlaceholder resource."
  );
  msgAlertContainer.className = "no-data";
  msgAlertContainer.appendChild(msgAlert);

  deleteDefaultMsg();
  displayData.appendChild(msgAlertContainer);
}

function deleteDefaultMsg() {
  let noDataMsg = displayData.querySelector(".no-data");
  noDataMsg.remove();
}

function extractData(resource) {
  let mainDataBox = document.createElement("div");
  mainDataBox.className = "main-data-box";

  let articleTitleContainer = document.createElement("h3");
  let articleTitle = document.createTextNode(`${resource.title}`);
  articleTitleContainer.appendChild(articleTitle);

  let artcileBodyContainer = document.createElement("p");
  let articleBody = document.createTextNode(`${resource.body}`);
  artcileBodyContainer.appendChild(articleBody);

  mainDataBox.appendChild(articleTitleContainer);
  mainDataBox.appendChild(artcileBodyContainer);

  displayData.appendChild(mainDataBox);
}
