const searchBtn = document.getElementById('searchBtn');
const mealList = document.getElementById('meals');
const mealRecipeContent = document.querySelector('.meal-recipe-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealRecipeContent.parentElement.classList.remove('showRecipe');
});

//Funcion que busca en el input lo que esta escrito y lo busca en el API
function getMealList() {
  //TRAEMOS EL INPUT DE LA SEARCH-BAR
  let searchInput = document.getElementById('meal-search-input').value.trim();

  //BUSCAMOS ESE MISMO INPUT EN EL API - usamos then method para que espere a que responda el API
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then((response) => response.json())
    .then((data) => {
      let html = '';
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                <div class="meal-item" data-id="${meal.idMeal}" >
                <img
                id="image"
                src="${meal.strMealThumb}"
                alt="meal image"
                />
                <h3 id="name">${meal.strMeal}</h3>
                <a href="#" class="recipeBtn">Get Recipe</a>
                </div>`;
          mealList.classList.remove('notFound'); //removemos sino no continua leyendo el css
        });
      } else {
        html = "Sorry, we didn't find any meal!";
        V;
      }
      mealList.innerHTML = html;
    });
}

//Funcion que busca la receta y muestra la html card de la receta
function getRecipe(e) {
  e.preventDefault();

  if (e.target.classList.contains('recipeBtn')) {
    let mealItem = e.target.parentElement;
    //busca en API la receta
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// funcion que linkea el html con el fetch de la data-id y muestra el html de recetas
function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
    <h2 class="recipe-title"> ${meal.strMeal}</h2>
    <p class="recipe-category"> ${meal.strCategory}</p>
    <div class="recipe-instructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="meal-recipe-image">
      <img id="img" src="${meal.strMealThumb}" alt="" />
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>`;
  mealRecipeContent.innerHTML = html;
  mealRecipeContent.parentElement.classList.add('showRecipe');
}
