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