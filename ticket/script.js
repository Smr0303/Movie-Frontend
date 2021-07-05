const urlParams = new URLSearchParams(window.location.search);
let order_id = urlParams.get("id");
const url = 'http://localhost:3000/booking';
// let order_id = 'order_HUOdcOfP83sne0';
let body = document.querySelector("body");
let time = "";
let seats = "";
let movie_date = "";
let booking_date = "";
obj = {
    order_id : order_id
}
fetch(`${url}/show_pay`,{
    method : "POST",
    body: JSON.stringify(obj),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
    console.log(data);
    fetch(`
https://api.themoviedb.org/3/movie/${data[0].movie_id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
return res.json();
}).then((movie_data) => {
    // console.log(movie_data)
slot_to_time(`${data[0].slot}`);
seat_converter(`${data[0].seat_text}`);
date_converter(`${data[0].date}`);
booking_date_converter(`${data[0].booking_date}`);
let ticket_container = document.createElement("div");
ticket_container.classList.add("ticket_container");
ticket_container.innerHTML = `
<div class="movie_image">
<img src="https://image.tmdb.org/t/p/w200${movie_data.poster_path}" alt="">
</div>
<div class="details_and_status">
<div class="status">
    <img src="../assets/booked_logo.png" alt="" class = "booked_image">
    <img src="../assets/failed_logo.png" alt="" class = "failed_image">
</div>
<div class="details">
<div class="order_details">
    <ul>
        <li>Movie : ${movie_data.original_title}</li>
        <li>Date : ${movie_date}</li>
        <li>Time : ${time}</li>
        <li>Seats : ${seats}</li>
        <li>Hall : ${data[0].hall}</li>
        <li>Booking date : ${booking_date}</li>
        <li>Order_ID : ${data[0].order_id}</li>
        <li>Payment_ID : ${data[0].payment_id}</li>
    </ul>
</div>
</div>

</div>`;
body.appendChild(ticket_container);
let details_and_status = document.querySelector(".details_and_status");
let booked_image = document.querySelector(".booked_image");
let failed_image = document.querySelector(".failed_image");
if(data[0].status == 1)
{
booked_image.style.display = "block";
let qr = document.createElement("div");
qr.classList.add("qr");
qr.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${data[0].order_id}&amp;size=100x100" alt="">`;
details_and_status.appendChild(qr);
let print_button = document.createElement("button");
print_button.classList.add("print_button");
print_button.innerHTML = 'Print Ticket';
body.appendChild(print_button)
print_button.addEventListener("click",() => {
    window.print();
})
}
else
failed_image.style.display = "block";

})
})

function slot_to_time(x)
{
    // console.log(x)
    if(x == "slot1")
    time = "9:00am - 11:00am";
    else if(x == "slot2")
    time = "11:30am - 1:30pm";
    else if(x == "slot3")
    time = "2:00pm - 4:00pm";
    else if(x == "slot4")
    time = "4:30pm - 6:30pm";
    else if(x == "slot5")
    time = "7:00pm - 9:00pm";
    else if(x == "slot6")
    time = "9:30pm - 11:30pm"
    else if(x == "slot7")
    time = "11:50pm - 2:00am";
}
function seat_converter(x)
{
    // console.log(x)
    let seat_array = x.split(',');
    // console.log(seat_array);
    for(var i=0;i<seat_array.length;i++)
    {
        let z = Number(seat_array[i].slice(seat_array[i].indexOf('t')+1,seat_array[i].length));
        let y = Math.ceil(Number(seat_array[i].slice(seat_array[i].indexOf('t')+1,seat_array[i].length))/20);
        let alpha = "";
        let number = 0;
        if(z%20==0)
        number = 20;
        else
        number = z%20;
        if(y == 1)
        alpha = 'A';
        else if(y==2)
        alpha = 'B';
        else if(y==3)
        alpha = 'C';
        else if(y==4)
        alpha = 'D';
        else if(y==5)
        alpha = 'E';
        else if(y==6)
        alpha = 'F';
        else if(y==7)
        alpha = 'G';
        seat_array[i] = `${alpha}${number}`
    }
    // console.log(seat_array)
    for(var i=0;i<seat_array.length;i++)
    {
       if(i!=seat_array.length-1)
       {
           seats+=`${seat_array[i]}, `
       }
       else
       {
        seats+=`${seat_array[i]}`
       }
    }
    // console.log(seats);
}
function date_converter(x)
{
    // console.log(x)
    let yyyy = x.slice(0,4);
    let mm = x.slice(5,7);
    let dd = x.slice(8,10);
    movie_date = `${dd}-${mm}-${yyyy}`;
}
function booking_date_converter(x)
{
    // console.log(x)
    let yyyy = x.slice(0,4);
    let mm = x.slice(5,7);
    let dd = x.slice(8,10);
    booking_date = `${dd}-${mm}-${yyyy}`;
}