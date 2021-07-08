const url = 'http://localhost:3000';
const token = localStorage.getItem("jwt");
let body = document.querySelector("body");
let status = 0;
fetch(`${url}/user/show_user`,{
    method : "POST",
    headers : {
        authorization: token
    }
}).then((res) => {
    return res.json()
}).then((data) => {
console.log(data)

let container = document.createElement("div");
container.classList.add("container")
container.innerHTML = `
<div class="user_logo">
<img src="../assets/user_logo.png" alt="">
</div>
<div class="details">
<div class="row">
    <div class="category">Name :</div>
    <div class="value">${data[0].name}</div>
</div>
<div class="row">
    <div class="category">Email :</div>
    <div class="value">${data[0].email}</div>
</div>
<div class="row">
    <div class="category">Contact :</div>
    <div class="value">${data[0].contact}</div>
</div>

</div>
<div class="change_password">
<div class = "warning">
</div>
<div class="heading">
    <h1>Reset Password</h1>
</div>
<div class="password_row">
  <div class="password_category">Old Password :</div>
  <input type="password" class="password_value" id = "old_password">
</div>
<div class="password_row">
  <div class="password_category">New Password :</div>
  <input type="password" class="password_value" id = "new_password">
</div>
<div class="submit">
  <button>Reset</button>
</div>
</div>`;

body.appendChild(container);

}).then(() => {
let old_password = document.getElementById("old_password");
let new_password = document.getElementById("new_password");
let reset_button = document.querySelector(".submit button");
let warning = document.querySelector(".warning");
let old_password_value = "";
let new_password_value = "";

old_password.addEventListener("change",(event) => {
    old_password_value = event.target.value;
});
     
new_password.addEventListener("change",(event) => {
    new_password_value = event.target.value;
});

reset_button.addEventListener("click",() => {
warning.style.display = "none";
old_password.classList.remove("no_entry")
new_password.classList.remove("no_entry")
 if(old_password_value == "")
 {
     warning.innerHTML = `<h1>Enter Old Password</h1>`;
     warning.style.display = "block";
     old_password.classList.add("no_entry")
     return;
 }
 if(new_password_value == "")
 {
     warning.innerHTML = `<h1>Enter New Password</h1>`;
     warning.style.display = "block";
     new_password.classList.add("no_entry")
     return;
 }
 obj = {
    oldPass : old_password_value,
    newPass : new_password_value
}
fetch(`${url}/auth/changePassword`,{
   method : "POST",
   body: JSON.stringify(obj),
   headers : {
        authorization: token,
        "Content-Type" : "application/json"
   }
}).then((res) => {
//    status = res.status;
   return res.json();
}).then((data) => {
    console.log(data)
         warning.innerHTML = `<h1>${data.message}</h1>`;
         warning.style.display = "block";
})
})
})