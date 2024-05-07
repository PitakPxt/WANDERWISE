
// burger menu 
const burger = $(".btn__hamburger");
const close = $(".menu__mobile__close");


function toggleClass() {
  $(this).toggleClass("active");
  $(".menu__mobile").toggleClass("active");
}

burger.on("click", toggleClass);
close.on("click", toggleClass);



const btnBook = $(".btn-book");

btnBook.on("click", () => {
  console.log("book now");

  const packageId = window.location.pathname.split("/")[2]
  const packageTitle = $("#package__title").text();
  const packagePrice = $("#package__price").text();
  const packageDescription = $("#package__desc").text();

  // save package to local storage
  const package = {
    id: packageId,
    title: packageTitle,
    price: packagePrice,
    description: packageDescription
  }

  localStorage.setItem("package", JSON.stringify(package));

  window.location.href = "/reservation.html";
})