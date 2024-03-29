/*

Given a DOM tree, please return all the tag names it has.

Your function should return a unique array of tags names in lowercase, order doesn't matter.

******************************************************************Solution***********************************************************/

/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {  
  let res = [];

  if(!tree){
    return res;
  }
  
  res.push(tree.tagName.toLowerCase());
  
  for(const child of tree.children){
    res = res.concat(getTags(child));
  }

  return Array.from(new Set(res)); // to return only unique tag names
}

function getTagsAnotherWay(tree) {    
  const res = [];

  function helper(root){
    if(root){
      const lowerCasedTagName = root.tagName.toLowerCase();    
      if(!res.includes(lowerCasedTagName)){
        res.push(lowerCasedTagName);
      }

      for(const child of root.children){
        helper(child);
      }
    }    
  }

  helper(tree);

  return res;
}