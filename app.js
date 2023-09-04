"use strict"

const $cupcakeList = $('#cupcake-list');
const $cupcakeForm = $('#cupcake-form');

async function grabCupcakes() {

  const resp = await fetch('/api/cupcakes')

  const data = await resp.json()

  let cupcakeList = [];

  for (cupcake in data){
    cupcakeList.push(cupcake);
  }

  $cupcakeList.append(cupcakeList)
}

