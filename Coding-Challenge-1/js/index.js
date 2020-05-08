
function fetchMeals(searchTerm){
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    let settings = {
        method : `GET`
    };

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error (response.statusText);
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch ( err => {
            console.log( err );
            let results = document.querySelector(".js-search-results");
            results.innerHTML = "";
            results.innerHTML +=`
                <div>
                    <h2>
                        Meal not found
                    </h2>
                </dvi>`

        })
}

function displayResults(data){
    console.log(data)

    let results = document.querySelector(".js-search-results");

    results.innerHTML = "";

    if (!data.meals)
    {
        results.innerHTML +=`
        <div>
            <h2>
                Meal not found
            </h2>
        </dvi>`
    }
    else{
        for ( let i = 0; i < data.meals.length; i ++){
            results.innerHTML +=`
            <div>
                <h2>
                    ${data.meals[i].strMeal}
                </h2>
                <p>
                    ${data.meals[i].strArea}
                </p>
                <p>
                    ${data.meals[i].strInstructions}
                </p>
                <img src ="${data.meals[i].strMealThumb}" alt = "${data.meals[i].strMeal}"
            </div>
            `
        }
    }

    
}


function watchForm(){
    let submitBtn = document.querySelector(".submitbtn");
    let searchTerm = document.querySelector(".js-query");
    console.log(submitBtn)

    submitBtn.addEventListener( 'click' , (event) => {

        event.preventDefault();

        if (searchTerm.value != ""){
            console.log(searchTerm)
            fetchMeals( searchTerm.value )
        }

    })
}

function init(){
    watchForm();
}

init();