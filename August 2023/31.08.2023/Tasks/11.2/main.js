function openSearch() {
    document.body.innerHTML += 
    `<input type="text" id="searchInput" placeholder="Enter a name to search..." oninput="showNames()" ">
    <div id="results"></div>
    `
    document.getElementsByTagName("button")[0].setAttribute("onclick", "")
}

var names = [
    "Sophia Johnson",
    "Liam Martinez",
    "Olivia Smith",
    "Noah Williams",
    "Ava Anderson",
    "Ethan Davis",
    "Isabella Taylor",
    "Aiden Jackson",
    "Mia Brown",
    "Elijah Miller"
  ];
 
  function showNames() {
    var findInput = searchInput.value;
    for (let i = 0; i < names.length; i++) {
      if (currentValue != findInput) {
        results.innerHTML = ``;
        currentValue = findInput;
      } else if (names[i].indexOf(findInput) > -1 && findInput.length > 0) {
        results.innerHTML += `
        <p>${names[i]}</p>
        `
      } 
    }
    var currentValue = findInput;
  }
  