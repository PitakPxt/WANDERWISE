let store = {};

const firstButton = $("#resv_1")[0];
const secondButton = $("#resv_2")[0];

firstButton.addEventListener("click", () => {
  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const phoneNumber = $("#phoneNumber").val();
  const ppl = $("#pplCount").val();

  if(firstName === "" || lastName === "" || phoneNumber === "" || ppl === ""){
      displayError('.form-wrapper', 'โปรดกรอกข้อมูลให้ครบถ้วน');
      return
  }

  const phonePattern = /^[0-9]{10}$/;
  const phoneResult = phonePattern.test(phoneNumber);

  if(!phoneResult){
      displayError('.form-wrapper', 'โปรดกรอกเบอร์โทรศัพท์ให้ถูกต้อง');
      return
  }

  if(isNaN(ppl) || ppl <= 0){
      displayError('.form-wrapper', 'โปรดกรอกจำนวนคนให้ถูกต้อง');
      return
  }

  store = {
    ...store,
    firstName,
    lastName,
    phoneNumber,
    ppl: parseInt(ppl),
  };

  $(".details").fadeOut(500, () => {
    $(".stepper__line._1").css("background-color", "var(--color-primary)");

    $("[data-step='2'] .step").addClass("active");

    const totalPrice = store.price * store.ppl;

    $("#display-total-price").text(totalPrice.toLocaleString() + " บาท");
    $(".payment").fadeIn(500);
  });
});

secondButton.addEventListener("click", () => {
  const fileInput = $("#formFile")[0];

  if (fileInput.files.length === 0) {
    displayError("#payment-form", "โปรดอัปโหลดไฟล์สลิปการโอนเงิน");
    return;
  }

  $(".payment").fadeOut(500, () => {
    $(".stepper__line._2").css("background-color", "var(--color-primary)");

    $("[data-step='3'] .step").addClass("active");
    $(".finish").fadeIn(500);

    $("#display-data").html(`
            <p>คุณ: ${store.firstName} ${store.lastName}</p>
            <p>เบอร์โทร: ${store.phoneNumber}</p>
            <p>จำนวนคน: ${store.ppl}</p>
        `);
  });
});

function displayError(elmName, message) {
  const errorElm = document.createElement("div");
  errorElm.classList.add("alert", "alert-danger");
  errorElm.innerHTML = message;
  const parent = $(elmName)[0];

  $(parent).prepend(errorElm);
  setTimeout(() => {
    $(errorElm).fadeOut(1000);
  }, 3000);
}

$(document).ready(() => {
  const package = localStorage.getItem("package");
  const packageData = JSON.parse(package);

  if (!packageData || packageData === null || !packageData.id ) {
    window.location.href = "/package";
    return
  }

  $("#package_img").attr("src", `/assets/images/package/${packageData.id}/01.png`);
  $("#package_title").html(packageData.title);
  $("#package_price").html(packageData.price);
  $("#package_desc").html(packageData.desc);

  
  const price = parseInt(packageData.price.replace(/,/g, ""));
  store = { ...store, package: packageData.id, price };

})
