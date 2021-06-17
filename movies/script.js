const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
let status = 1;
// const id = 337404;
// const id = 423108;
// const id = 460465;

function show_page()
{
    status = 0;
let body = document.querySelector("body");
fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    // console.log(data);
        // title.innerHTML = `${data.title}`;
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
            return res.json();
        }).then((vid_data) => {
        // console.log(vid_data)
        let vid_key = "wuhuwxx";
        if(id == 423108 || id == 460465)
        {
            vid_key = vid_data.results[1].key
        }
        else{
            vid_key = vid_data.results[0].key
        }
        let container = document.createElement("div");
        container.classList.add("container")
        container.innerHTML = `
        <div class="movie_img">
            <img src="https://image.tmdb.org/t/p/w200${data.poster_path}" alt="">
        </div>
        <div class="movie_details">
            <div class="heading">
                <h1>${data.original_title}</h1>
                <img src="../assets/star.png" alt="">
                <h2>${data.vote_average}</h2>
            </div>
            <div class="overview">
                <p>${data.overview}</p>
            </div>
        </div>
        <div class="trailer">
            <iframe class="trailer_vid" width="560" height="315" src="https://www.youtube.com/embed/${vid_key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`;
        body.appendChild(container)
        status = 1;
})
})
}

function show_cast()
{
    let body = document.querySelector("body");
fetch(`
https://api.themoviedb.org/3/movie/${id}/credits?api_key=65bdc6e47dd2725b55a936c4b0242e7b&language=en-US`).then((res) => {
    return res.json();
}).then((data) => {
    console.log(data);
    let scroll_container = document.createElement("div");
    scroll_container.classList.add("scroll_container")
    for(var i=0;i<data.cast.length;i++)
    {
        // console.log(i)
        let box = document.createElement("div");
        box.classList.add("box")
        if(data.cast[i].profile_path!=null)
        {
        // box.innerHTML = `
        // <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" alt="">`;
        box.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" alt="">
        <div class="cast_name">
            <h1>${data.cast[i].original_name}</h1>
        </div>
        <div class="cast_character">
            <h1>Character : ${data.cast[i].character}</h1>
        </div>`;
        scroll_container.appendChild(box)
        }
}
body.appendChild(scroll_container)
})
}

show_page();
setTimeout(() => {
    show_cast();
}, 1000);
// show_cast();