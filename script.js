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