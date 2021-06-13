let movie_categories = document.querySelectorAll(".movie_categories")

// console.log(movie_categories)
// movie_categories[0].children[0].style.display="flex"
for(var i=0;i<movie_categories.length;i++)
{
    movie_categories[i].children[0].style.display="flex"
    // console.log(movie_categories[i].children[0])
}
let cat_current = [0,0,0,0,0]
function change(i,n)
{

  for(var j=0;j<2;j++)
  {
    movie_categories[i].children[j].style.display="none"
    // console.log(movie_categories[i].children[j])
  }
  if(n>0)
  cat_current[i] = (cat_current[i]+n)%(2);
  else
  {
  cat_current[i] = (cat_current[i]+n)%(2);
  if(cat_current[i]<0)
  cat_current[i] = (2) + cat_current[i];
  }
  // console.log(cat_current[i])
  movie_categories[i].children[cat_current[i]].style.display="flex"
  
}