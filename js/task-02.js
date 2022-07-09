const ingredients = [
  'Potatoes',
  'Mushrooms',
  'Garlic',
  'Tomatos',
  'Herbs',
  'Condiments',
];

const mainList = document.querySelector('#ingredients');

const createEl = (array, list) => {
  const itemList = [];
  array.map((element) => {    
    const newItem = document.createElement("li");
    newItem.textContent = element;
    newItem.classList.add('item');
    itemList.push(newItem);      
  });     
  list.append(...itemList);
  return itemList;
}

createEl(ingredients, mainList);


