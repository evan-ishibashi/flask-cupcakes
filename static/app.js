"use strict";

const $cupcakeList = $('#cupcake-list');
const $cupcakeForm = $('#cupcake-form');


/** Grabs the instances of cupcakes from the database */
async function grabCupcakes() {

  const resp = await fetch('/api/cupcakes')
  const data = await resp.json()

  return data.cupcakes;
  // returns [(cupcake item1), (cupcake item2)]
}


/** Generates/Appends HTML of Each Cupcake */
function displayCupcakes(cupcakeData) {
  $cupcakeList.empty();

  for (const cupcake of cupcakeData) {
    const $cupcake = $(`
        <li id="${cupcake.flavor}">
         <div>
           <img
              src="${cupcake.image_url}"
              alt="${cupcake.flavor}"
              >
           <div class="media-body">
             <h5 class="text-primary"><b>Cupcake Details</b></h5>
             <div><small>Cupcake Flavor: ${cupcake.flavor}</small></div>
             <div><small>Cupcake Rating: ${cupcake.rating}</small></div>
             <div><small>Cupcake Size: ${cupcake.size}</small></div>
           </div>
         </div>
       </li>
      `);

    $cupcakeList.append($cupcake);
  }
}

/** Invokes cupcakeData to get instances to display them on the HTML */
async function displayCupcakeList(){

  const cupcakeData = await grabCupcakes();
  displayCupcakes(cupcakeData);
}


/**Handles Cupcake Submission Form.
 * Invokes displayCupcakeList to append new cupcake to list.
 */
async function addCupcake(evt){
  evt.preventDefault()
  //FIXME: needs "$" on vars since they are jQuery vars
  const flavor = $('#flavor').val();
  const rating = $('#rating').val();
  const size = $('#size').val();
  const image = $('#image').val();

  const resp = await fetch('/api/cupcakes', {
    method: "POST",
    body: JSON.stringify({
      "flavor": flavor,
      "rating": rating,
      "size": size,
      "image_url": image
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  displayCupcakeList();
}

$cupcakeForm.on("submit", addCupcake);

displayCupcakeList();