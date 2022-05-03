const searchBtn = document.getElementById('searchBtn');
const mealList = document.getElementById('meals');
const mealRecipeContent = document.querySelector('.meal-details');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//Search bar - event listener
searchBtn.addEventListener('click', getMealList);

//Funcion que busca en el input lo que esta escrito y lo busca en el API

function getMealList() {
  let searchInput = document.getElementById('meal-search-input').value.trim();
  console.log(searchInput);
}
