/*

Given a DOM tree, flatten it into an one dimensional array, in the order of layer by layer, like below.

********************************************************************Solution**************************************************************/

/**
 * @param {HTMLElement | null} root
 * @return {HTMLElement[]}
 */
function flatten(root) {  
  const queue = [], res = [];

  if(!root){
    return res;
  }

  queue.push(root);

  while(queue.length){
    let removedElement = queue.shift();
    res.push(removedElement);
    
    queue.push(...removedElement.children);
  }

  return res;
}