"use strict"

const $cupcakeList = $('#cupcake-list');
const $cupcakeForm = $('#cupcake-form');

const cupcakeList = [];

async function grabCupcakes() {

  const resp = await fetch('/api/cupcakes')
  const data = await resp.json()

  return data.cupcakes;
  // returns [(cupcake item1), (cupcake item2)]
}

// data.cupcakes[0].flavor


  // for (let i = 0; i < data.cupcakes.length; i++) {
  //   cupcakeList.push(data.cupcakes[i].flavor);
  // }

  // $cupcakeList.append(cupcakeList)