const urlParams = new URLSearchParams(window.location.search);
let order_id = urlParams.get("id");
const url = 'http://localhost:3000/booking';
// let order_id = 'order_HTkhd5PYkIQbBb';
let body = document.querySelector("body");
let time = "";
let seats = "";
let movie_date = "";
obj = {
    order_id : order_id
}
let options = obj;
fetch(`${url}/show_pay`,{
    method : "POST",
    body: JSON.stringify(obj),
    headers : {
         "Content-Type" : "application/json"
    }
}).then((res) => {
    return res.json()
}).then((data) => {
    let date = new Date;
    // if(date.getTime() > Number(data[0].max_time)-10000)
    // {
    // alert('Times Up :)');
    // location.href = `../index.html`;
    // }
    // if(data[0].status !=null)
    // {
    // alert('Order Session Expired :)');
    // location.href = `../index.html`;
    // }
     console.log(data)
fetch(`
https://api.themoviedb.org/3/movie/${data[0].movie_id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
return res.json();
}).then((movie_data) => {
slot_to_time(`${data[0].slot}`);
seat_converter(`${data[0].seat_text}`);
date_converter(`${data[0].date}`);
// console.log(movie_data);
let container = document.createElement("div");
container.classList.add("container");
container.innerHTML = `
<div class="movie_image">
<img src="https://image.tmdb.org/t/p/w200${movie_data.poster_path}" alt="">
</div>
<div class="details_and_payment">
<div class="details">
    <ul>
        <li>Movie : ${movie_data.original_title}</li>
        <li>Date : ${movie_date}</li>
        <li>Time : ${time}</li>
        <li>Seats : ${seats}</li>
    </ul>
</div>
<div class="payment">
 <div class="razor_text">
     <input type="radio" id="razor" checked>
     <label for="razor" id="razor_label">Pay with Razorpay</label>
 </div>

 <label for="razor" id="razor_image"><img src="https://i0.wp.com/getcodify.com/wp-content/uploads/2018/11/razorpay-title-screenshot.png?fit=1000%2C600&ssl=1&resize=1280%2C720" alt=""></label>
 <div class="pay_button">
     <button id="rzp-button1">Pay ₹${data[0].total/100}</button>
 </div>
</div>
</div>`;
body.appendChild(container);
options = {
    "key": "rzp_test_Ttaaq5g7c649z2", // Enter the Key ID generated from the Dashboard
    // "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    // "currency": "INR",
    "name": "KinoTicket.com",
    "description": "Test Transaction",
    "image": "https://parade.com/wp-content/uploads/2014/06/cheapest-movie-ticket-ftr.jpg",
    "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        let loading_image = document.querySelector(".loading_image");
        loading_image.style.display = "block";
        window.scrollTo(0,0);
        obj = {
            order_id : order_id,
            payment_id : response.razorpay_payment_id
        }
        fetch(`${url}/check_pay`,{
            method : "POST",
            body: JSON.stringify(obj),
            headers : {
                 "Content-Type" : "application/json"
            }
        }).then((res) => {
            console.log(res.status);
            if(res.status==200)
            {
            // alert('Payment failed. Please Try Again');
            location.href = `../ticket/index.html?id=${order_id}`
            }
        })
    },
    "prefill": {
        "name": "",
        "email": data[0].email,
        "contact": "+910123456789"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response){

    obj = {
        order_id : order_id,
        payment_id : response.error.metadata.payment_id
    }
    fetch(`${url}/check_pay`,{
        method : "POST",
        body: JSON.stringify(obj),
        headers : {
             "Content-Type" : "application/json"
        }
    }).then((res) => {
        console.log(res.status);
        if(res.status==200)
        {
        alert('Payment failed. Please Try Again');
        location.href = `../ticket/index.html?id=${order_id}`
        }
    })
        // alert('Payment failed. Please Try Again');
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
});
document.getElementById('rzp-button1').onclick = function(e){
    // if(date.getTime() > Number(data[0].max_time)-10000)
    // {
    // alert('Times Up :)');
    // location.href = `../index.html`;
    // }
    rzp1.open();
    e.preventDefault();
}
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