const urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams)
let id = urlParams.get("id");
let slot = urlParams.get("slot");
let date = urlParams.get("date");
// let id = 337404;
// let slot = "slot1";
// let date = "2021-06-22";
let time = "";
const url = 'http://localhost:3000';

if(slot == "slot1")
time = "9:00am - 11:00am";
else if(slot == "slot2")
time = "11:30am - 1:30pm";
else if(slot == "slot3")
time = "2:00pm - 4:00pm";
else if(slot == "slot4")
time = "4:30pm - 6:30pm";
else if(slot == "slot5")
time = "7:00pm - 9:00pm";
else if(slot == "slot6")
time = "9:30pm - 11:30pm"
else if(slot == "slot7")
time = "11:50pm - 2:00am";


let body = document.querySelector("body");
let movie_details = document.createElement("div");
// let super_container = document.createElement("div");
movie_details.classList.add("movie_details");
fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data)

// console.log(movie_details)
movie_details.innerHTML = `
<div class="movie_image">
            <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="">
        </div>
        <div class="description">
            <div class="title">
               <h1>${data.original_title}</h1>
            </div>
            <div class="show_details">
                <ul>
                    <li>Date : ${date}</li>
                    <li>Time : ${time}</li>
                    <li>Venue : KinoTheatre</li>
                </ul>
            </div>
        </div>`;
        // movie_details.style.display = "flex";
})


obj = {
    movie_id : id,
    slot : slot,
    date : date
}
fetch(`${url}/show_seats`,{
    method : "POST",
    body: JSON.stringify(obj),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
    console.log(data);
    let container = document.createElement("div");
    container.classList.add("container");
    let seat_container = document.createElement("div");
    seat_container.classList.add("seat_container");
    let a = 0;
    for(var i=0;i<data.length/20;i++)
    {
      let row = document.createElement("div")
      row.classList.add("row")
      for(var j=0;j<20;j++)
      {
          let seat = document.createElement("div");
          seat.classList.add("seat");
          seat.setAttribute("id",`${data[a].seat_id}`);

          if(data[a].booked == 1)
          seat.classList.add("booked")
          else if(data[a].blocked == 1)
          seat.classList.add("blocked")
          else
          seat.setAttribute("onclick",`select_seat('${seat.id}')`)
          row.appendChild(seat);
          a++;
      }
      seat_container.appendChild(row);
      if(i==1)
      {
          let seat_category = document.createElement("div");
          seat_category.classList.add("seat_category");
          seat_category.innerHTML = `Lounge-₹280`;
          seat_container.appendChild(seat_category);
          let separation = document.createElement("div");
          separation.classList.add("separation");
          seat_container.appendChild(separation)
      }
      if(i==4)
      {
        let seat_category = document.createElement("div");
        seat_category.classList.add("seat_category");
        seat_category.innerHTML = `Classic-₹180`;
        seat_container.appendChild(seat_category);
          let separation = document.createElement("div");
          separation.classList.add("separation");
          seat_container.appendChild(separation)
      }
      if(i==6)
      {
        let seat_category = document.createElement("div");
        seat_category.classList.add("seat_category");
        seat_category.innerHTML = `Regular-₹120`;
        seat_container.appendChild(seat_category);
      }
    }
    container.appendChild(seat_container)
    let instructions = document.createElement("div");
    instructions.classList.add("instructions");
    instructions.innerHTML = `        
    <div><div class="booked_sign"></div>Booked</div>
    <div><div class="blocked_sign"></div>Blocked</div>
    <div><div class="selected_sign"></div>Selected</div>`;
    container.appendChild(instructions)
    let screen_image = document.createElement("div");
    screen_image.classList.add("screen_image");
    screen_image.innerHTML = `
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6RKyyaX0uuzkUjCK7WOEK_q5Csiw0pxPv0Q&usqp=CAU" alt="">
    Screen`;
    container.appendChild(screen_image)
    body.appendChild(container)
    body.appendChild(movie_details)
    // body.appendChild(super_container)
})
let seat_array = [];
function select_seat(id)
{
    // console.log(id);
    let seat = document.getElementById(`${id}`);
    // console.log(seat)
    if(seat.classList.length==2)
    {
    seat.classList.remove("selected");
    // console.log(seat_string.indexOf(id));
    let index = seat_array.indexOf(id);
    if (index > -1) {
    seat_array.splice(index, 1);
    }
    }
    else
    {
    seat.classList.add("selected")
    seat_array.push(id);
    }
    // seat_string = seat_string.slice(0,seat_string.lastIndexOf('or')-1);
    console.log(seat_array);
    // console.log(seat_string.lastIndexOf('or'));
}