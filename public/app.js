var counter = 0;

function clicked(first, second, item) {
  console.log("clicked");
  (counter % 2 == 0) ? (first.classList.add("show")) : (first.classList.remove("show"));
  (counter % 2 == 0) ? (second.classList.add("is-active")) : (second.classList.remove("is-active"));
  (counter % 2 == 0) ? (item.style.position = "fixed") : (item.style.position = "absolute");
  item.blur();
  counter++;
}

// try {
//   var dark = localStorage.getItem("dark")
// } catch (exception) {
//   console.log("no dark");
//   var dark = null;
// }

window.onload = function() {
  var body = document.getElementsByTagName("body")[0];
  // var darkToggle = document.getElementsByClassName("darkToggle")[0];
  // var darkSwitch = document.getElementsByClassName("darkSwitch-checkbox")[0];
  // if (dark == "true") {
  //   body.classList.add("dark");
  //   darkSwitch.checked = true;
  //   dark = true;
  // }
  document.addEventListener("touchstart", function() {}, true);
  var mobileMenu = document.getElementsByClassName("mobileMenu")[0];
  var icon = document.getElementsByClassName("icon")[0]
  var navBar = document.getElementsByTagName("nav")[0];
  mobileMenu.onclick = function() {
    clicked(navBar, icon, mobileMenu.firstElementChild.firstElementChild);
    console.log(mobileMenu.firstElementChild.firstElementChild);
  }
  // darkToggle.onclick = function() {
  //   darkSwitch.checked = !dark;
  //   if (!dark) {
  //     body.classList.add("dark");
  //     try {
  //       localStorage.setItem("dark", "true");
  //     } catch (e) {}
  //     dark = true;
  //     console.log("dark");
  //   } else if (dark) {
  //     body.classList.remove("dark");
  //     try {
  //       localStorage.removeItem("dark");
  //     } catch (e) {}
  //     dark = false;
  //   }
  // }
  // darkSwitch.onchange = function() {
  //   if (!dark) {
  //     body.classList.add("dark");
  //     try {
  //       localStorage.setItem("dark", "true");
  //     } catch (e) {}
  //     dark = true;
  //     console.log("dark");
  //   } else if (dark) {
  //     body.classList.remove("dark");
  //     try {
  //       localStorage.removeItem("dark");
  //     } catch (e) {}
  //     dark = false;
  //   }
  // }
}
