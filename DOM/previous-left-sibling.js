/*

Given a DOM tree and a target element, please return the previous left sibling.

Like above, the previous left sibling of green <a/> is the blue <button/>. Notice that they don't necessarily have the same parent element.

If no left sibling, then return null.

**********************************************************************Solution*************************************************************/

/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {  
  if(!root){
    return root;
  }

  const queue = [];

  queue.push(root);

  while(queue.length){
    let size = queue.length;

    let leftSibling = null, removedElement;
    while(size-- > 0){
      removedElement = queue.shift();      

      if(removedElement === target){
        return leftSibling;
      }

      queue.push(...removedElement.children);
      
      leftSibling = removedElement;
    }
  }

  return null;
}
