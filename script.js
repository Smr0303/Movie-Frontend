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
//now showing container

const container=document.querySelector(".showing-container");
const URL=`https://api.themoviedb.org/3/discover/movie?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US&sort_by=popularity.desc`;
fetch(URL).then((data)=>{
    return data.text();
}).then((res)=>{
    const array=JSON.parse(res);
    console.log(array);

    array.results.forEach((ele)=>{

        const imageUrl=`https://image.tmdb.org/t/p/w200/${ele.poster_path}`;
        
        const card=document.createElement('div');
        card.classList.add('card');
        card.innerHTML=`<div class="card-motion">
        <div class="card-front">
          <img class="card-image" src="${imageUrl}" alt="" />
          <div class="bottom-content">
            <h4>${ele.title}</h4>
        <span class="fa fa-star checked">${ele.vote_average}</span>
        </div>
        </div>
        <div class="card-back">
          <h2>Overview</h2><br>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat commodi harum quod reiciendis tempora quam, quos magnam molestiae magni corporis dolorem necessitatibus, tenetur accusamus eum laborum optio est. Sit nihil repellat consequatur numquam atque velit! Expedita accusantium dolores corporis voluptates, dolorem fugit reiciendis accusamus dolorum nostrum quaerat sequi, aspernatur architecto.</p>
        <button class="card-button">Book Now</button>
        </div>
        </div>`
        container.appendChild(card);
    })
});




