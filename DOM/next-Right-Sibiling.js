/*

Given a DOM tree and a target element, please return the next right sibling.

Like above, the next right sibling of <button/> is the blue <a/>. Notice that they don't necessarily have the same parent element.

If no right sibling, then return null.

What is time & space cost of your solution ?

*******************************************************************Solution****************************************************************/


/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */
function nextRightSibling(root, target) {  
  const queue = [], res = [];

  if(!root){
    return root;
  }

  queue.push(root);

  while(queue.length){
    let size = queue.length;    
    
    for(let i = 0; i < size; i++){
      const removedElement = queue.shift();

      if(removedElement === target){
        return i === size - 1 ? null : queue.shift()
      }

      queue.push(...removedElement.children);
    }
  }

  return null;  
}