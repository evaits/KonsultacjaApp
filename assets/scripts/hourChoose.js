const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll("header svg");


let currYear
let currMonth
let chooseDate
let chooseDay

if(getCookie("date") == undefined){
    currYear = new Date().getFullYear();
    currMonth = new Date().getMonth();
    chooseDay = new Date().getDate();
    chooseDate = new Date(currYear, currMonth, chooseDay);
}
else {
    chooseDate = new Date(getCookie("date"));
    currYear = chooseDate.getFullYear();
    currMonth = chooseDate.getMonth();
    chooseDay = chooseDate.getDay();
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    const date = new Date(currYear, currMonth, 1);
    let firstDayofMonth = date.getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    let day;
    for (let i = firstDayofMonth; i > 0; i--) {
        day = lastDateofLastMonth - i + 1

        liTag += `<li onclick="setCookie('date', '${new Date(currYear, currMonth-1, day)}', 2)" class="inactive">${day}</li>`;
    }

    let isChooseDate
    for (let i = 1; i <= lastDateofMonth; i++) {
        
        if(getCookie("date") == undefined){
            isChooseDate = i === chooseDay && currMonth === chooseDate.getMonth() && currYear === chooseDate.getFullYear() ? "active" : "";
        }
        else {
            isChooseDate = i === chooseDate.getDate() ? "active" : ""
        }
        liTag += `<li onclick="setCookie('date', '${new Date(currYear, currMonth, i)}', 2)" class="${isChooseDate}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        day = i - lastDayofMonth + 1
        liTag += `<li onclick="setCookie('date', '${new Date(currYear, currMonth + 1, day)}', 2)" class="inactive">${day}</li>`
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
};

renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            currYear = icon.id === "prev" ? currYear - 1 : currYear + 1;
            currMonth = currMonth < 0 ? 11 : 0;
        }

        renderCalendar();
    });
});

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(cName, cValue, expSec) {
    let date = new Date();
    date.setTime(date.getTime() + (expSec * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
    window.location.reload()
}

// Modal dropdown select
const form = document.querySelector(".form");
const dropdowns = document.querySelectorAll(".dropdown");

// Check if Dropdowns are Exist
// Loop Dropdowns and Create Custom Dropdown for each Select Element
if (dropdowns.length > 0) {
   dropdowns.forEach((dropdown) => {
      createCustomDropdown(dropdown);
   });
}

// Check if Form Element Exist on Page
if (form !== null) {
   form.addEventListener("submit", (e) => {
      e.preventDefault();
   });
}

// Create Custom Dropdown
function createCustomDropdown(dropdown) {
   // Get All Select Options
   // And Convert them from NodeList to Array
   const options = dropdown.querySelectorAll("option");
   const optionsArr = Array.prototype.slice.call(options);

   // Create Custom Dropdown Element and Add Class Dropdown
   const customDropdown = document.createElement("div");
   customDropdown.classList.add("dropdown");
   dropdown.insertAdjacentElement("afterend", customDropdown);

   // Create Element for Selected Option
   const selected = document.createElement("div");
   selected.classList.add("dropdown-select");
   selected.textContent = optionsArr[0].textContent;
   customDropdown.appendChild(selected);

   // Create Element for Dropdown Menu
   // Add Class and Append it to Custom Dropdown
   const menu = document.createElement("div");
   menu.classList.add("dropdown-menu");
   customDropdown.appendChild(menu);
   selected.addEventListener("click", toggleDropdown.bind(menu));

   // Create Wrapper Element for Menu Items
   // Add Class and Append to Menu Element
   const menuInnerWrapper = document.createElement("div");
   menuInnerWrapper.classList.add("dropdown-menu-inner");
   menu.appendChild(menuInnerWrapper);

   // Loop All Options and Create Custom Option for Each Option
   // And Append it to Inner Wrapper Element
   optionsArr.forEach((option) => {
      const item = document.createElement("div");
      item.classList.add("dropdown-menu-item");
      item.dataset.value = option.value;
      item.textContent = option.textContent;
      menuInnerWrapper.appendChild(item);

      item.addEventListener(
         "click",
         setSelected.bind(item, selected, dropdown, menu)
      );
   });

   // Add Selected Class to First Custom Select Option
   menuInnerWrapper.querySelector("div").classList.add("selected");

   // Hide the Original Dropdown(Select)
   dropdown.style.display = "none";
}

// Toggle for Display and Hide Dropdown
function toggleDropdown() {
   if (this.offsetParent !== null) {
      this.style.display = "none";
   } else {
      this.style.display = "block";
   }
}

// Set Selected Option
function setSelected(selected, dropdown, menu) {
   // Get Value and Label from Clicked Custom Option
   const value = this.dataset.value;
   const label = this.textContent;

   // Change the Text on Selected Element
   // Change the Value on Select Field
   selected.textContent = label;
   dropdown.value = value;

   // Close the Menu
   // Reset Search Input Value
   // Remove Selected Class from Previously Selected Option
   // And Show All Div if they Were Filtered
   // Add Selected Class to Clicked Option
   menu.style.display = "none";
   menu.querySelectorAll("div").forEach((div) => {
      if (div.classList.contains("is-select")) {
         div.classList.remove("is-select");
      }
      if (div.offsetParent === null) {
         div.style.display = "block";
      }
   });
   this.classList.add("is-select");
}

// Filter the Items
function filterItems(itemsArr, menu) {
   // Get All Custom Select Options
   // Get Value of Search Input
   // Get Filtered Items
   // Get the Indexes of Filtered Items
   const customOptions = menu.querySelectorAll(".dropdown-menu-inner div");
   const value = this.value.toLowerCase();
   const filteredItems = itemsArr.filter((item) =>
      item.value.toLowerCase().includes(value)
   );
   const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));

   // Check if Option is not Inside Indexes Array
   // And Hide it and if it is Inside Indexes Array and it is Hidden Show it
   itemsArr.forEach((option) => {
      if (!indexesArr.includes(itemsArr.indexOf(option))) {
         customOptions[itemsArr.indexOf(option)].style.display = "none";
      } else {
         if (customOptions[itemsArr.indexOf(option)].offsetParent === null) {
            customOptions[itemsArr.indexOf(option)].style.display = "block";
         }
      }
   });
}

// Close Dropdown if Clicked Outside Dropdown Element
function closeIfClickedOutside(menu, e) {
   if (
      e.target.closest(".dropdown") === null &&
      e.target !== this &&
      menu.offsetParent !== null
   ) {
      menu.style.display = "none";
   }
}

// Modal

// Modal open
const modal = document.querySelector('.modal')

// Function open modal

// Function close modal