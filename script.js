const url = 'http://localhost:3000';
const body=document.querySelector("body");
window.addEventListener('load',()=>{
body.classList.add("visible");
});
const slider = document.querySelector(".slider");
const left_arrow = document.querySelector(".left_arrow");
const right_arrow = document.querySelector(".right_arrow");
const total_images = document.querySelector(".dots").children.length;
let current = 0;
// let slider_height;

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


slider.children[0].style.display = "block";

let myinterval;
function interval()
{
myinterval = setInterval(() => {
    
    show_arrow(1);
},5000 );
}
interval();
function show_dot(n)
{
    clearInterval(myinterval);
    interval();
    for(var i=0;i<total_images;i++)
    {
    slider.children[i].style.display = "none";
    }
    // slider.children[n-1].classList.add("animation");
    slider.children[n].style.display = "block";
    current = n;
}
function show_arrow(n)
{
    clearInterval(myinterval);
    interval();
    if(n>0)
    current = (current+n)%total_images;
    else
    {
    current = (current+n)%total_images;
    if(current<0)
    current = total_images + current;
    }
        m  = current;
    for(var i=0;i<total_images;i++)
    {
    slider.children[i].style.display = "none";
    }
    // slider.children[n-1].classList.add("animation");
    slider.children[m].style.display = "block";
    // slider.children[n-1].classList.remove("animation");
}
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

let streaming = document.querySelector(".streaming");

fetch(`https://api.themoviedb.org/3/list/7099202?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res)=> {
    return res.json()
}).then((data) => {
    // console.log(data)
    for(var i=0;i<data.items.length;i++)
    {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id",data.items[i].id);
        card.innerHTML = `
        <div class="card-motion" onclick = show_movie(${data.items[i].id})>
   <div class="movie_container">
       <img src="https://image.tmdb.org/t/p/w200/${data.items[i].poster_path}" alt="">
       <div class="title">
         <h1>${data.items[i].title}</h1>
        </div>
         <div class="rating">
           <img src="./assets/star.png" alt="">
           <h2>${data.items[i].vote_average}</h2>
         </div>

    </div>
    <div class="card-back">
      <p>${data.items[i].overview}</p>
    </div>
  </div> `;
        streaming.appendChild(card)
    }
})

function show_movie(id)
{

    // console.log(id)
    // if(window.screen.width<=1200)
    // {
    location.href = `./movies/index.html?id=${id}`
    // }
}

// fetch(`https://api.themoviedb.org/3/discover/movie?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US&sort_by=popularity.desc`).then((res)=> {
//     return res.json()
// }).then((data) => {
//     console.log(data)
//     for(var i=0;i<data.results.length;i++)
//     {
//         let movie_container = document.createElement("div");
//         movie_container.classList.add("movie_container")
//         movie_container.innerHTML = `
//         <img src="https://image.tmdb.org/t/p/w200${data.results[i].poster_path}" alt="">
//         <div class="title">
//           <h1>${data.results[i].title}"</h1>
//           </div>
//           <div class="rating">
//             <img src="./assets/star.png" alt="">
//             <h2>${data.results[i].vote_average}"</h2>
//           </div>`;
//         streaming.appendChild(movie_container)
//     }
// })