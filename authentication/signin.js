const button=document.querySelector('button')
const URL="";
const signIn=document.querySelector('.sign-in-form')


signIn.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log("submit");

    const email=document.querySelector(".input-email").value;
    const password=document.querySelector(".input-password").value;

    fetch(URL,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            email,
            password,
        }),
    }).then((data)=>{
        if(token){
            localStorage.setItem('jwt',token);
            location.href="";

        }
        else{
            alert("Signin-Again");
        }
    })

});

