/***
 
Height of a tree is the maximum depth from root node. Empty root node have a height of 0.

If given DOM tree, can you create a function to get the height of it?

For the DOM tree below, we have a height of 4.

<div>
  <div>
    <p>
      <button>Hello</button>
    </p>
  </div>
  <p>
    <span>World!</span>
  </p>
</div>

 */

/**
 * @param {HTMLElement | null} tree
 * @return {number}
 */

function getHeight(tree) {
  if (!tree) {
    return 0;
  }

  let height = 0;
  for (let child of tree.children) {
    height = Math.max(height, getHeight(child));
  }

  return 1 + height;
}
