const signUp = document.querySelector(".sign-up-form");
const server = ""; //signUp url after hosting

signUp.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector(".signUp-name").value;
  const email = document.querySelector(".signUp-email").value;
  const password = document.querySelector(".signUp-password").value;
  const repassword = document.querySelector(".signUp-repassword").value;

  if (password !== repassword) {
    alert("Entered passwords are different");
    return;
  }

  fetch(server, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((data) => {
      if (token) {
        const { token, message } = data;
        localStorage.setItem("jwt", token);
      } else {
        alert("Error Signup again");
      }
    })
    .catch((err) => {
      alert("Signup again server error");
    });
});
