/*

Let's do some simple two-way binding.

Please create a function model(state, element), to bind state.value to the HTMLInputElement element.

const input = document.createElement('input')
const state = { value: 'BFE' }
model(state, input)

console.log(input.value) // 'BFE'
state.value = 'dev'
console.log(input.value) // 'dev'
input.value = 'BFE.dev'
input.dispatchEvent(new Event('change'))
console.log(state.value) // 'BFE.dev'

*/

/**
 * @param {{value: string}} state
 * @param {HTMLInputElement} element
 */
function model(state, element) {
  // initialized the element value with state value
  element.value = state.value;

  // Update the state value, then it will also update the element value with new state value
  Object.defineProperty(state, "value", {
    get: () => element.value,
    set: (value) => (element.value = value),
  });

  // this will update state value then state's setter method will update input value
  element.addEventListener(
    "change",
    (event) => (state.value = event.target.value)
  );
}
