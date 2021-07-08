const url = 'http://localhost:3000';
const body=document.querySelector("body");
window.addEventListener('load',()=>{
body.classList.add("visible");
});

let search = document.querySelector(".search").children[0];

// console.log(search)

// search.placeholder = "hii"
{
let i=0,j=0;
let str = ["Movies...","Shows...","Sports..."]
setInterval(() => {
    search.placeholder = str[j].slice(0,i);
    i=(i+1)%(str[j].length+1);
    if(i==0)
    j= (j+1)%str.length;
}, 200);
}

const token = localStorage.getItem("jwt");
if (token) {
    fetch(`${url}/verify_login`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    }).then((res) => {
        console.log(res)
        if(res.status == 200)
        {
            let signin = document.getElementById("signin_link");
            let user_logo = document.getElementById("user_logo");
            signin.style.display = "none";
            user_logo.style.display = "block";
        }
    })
}

const data=document.querySelectorAll('input');
const button=document.querySelector('.button');
let reason,Name,number,region,organisation,email;

data[1].addEventListener("change",(event)=>{
  reason=event.target.value;
});

data[2].addEventListener("change",(event)=>{
  Name=event.target.value;
});
data[3].addEventListener("change",(event)=>{
  organisation=event.target.value;
});
data[4].addEventListener("change",(event)=>{
  region=event.target.value;
});
data[5].addEventListener("change",(event)=>{
  number=event.target.value;
});
data[6].addEventListener("change",(event)=>{
  email=event.target.value;
});
button.addEventListener("click",()=>{
  if(reason==""||Name==""||region==""||number==""||email==""){
    alert("Form is not completely filled");
    return;
  }

  Obj={
    reason,
    Name,
    organisation,
    region,
    number,
    email,
  }

  fetch(`${url}/user/contactUs`,{
    method:"POST",
    body:JSON.stringify(Obj),
    headers:{
      "Content-type":"application/json",
    },
}).then((res)=>{
  return res.json();
}).then((data)=>{
  if(status!=200){
    alert(data.message);
  }
  else{
    alert("Thanks for your feedback");
}
}).catch((err)=>{
  alert("Error please retry");
})

});