/**

Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B.

By corresponding, we mean a and b have the same relative position to their DOM tree root.

follow up

This could a problem on general Tree structure with only children.

Could you solve it recursively and iteratively?

Could you solve this problem with special DOM api for better performance?

What are the time cost for each solution?

*/

/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */
const findCorrespondingNode = (rootA, rootB, target) => {
  let node = target;
  const path = [];

  // traversing the DOM tree A from target node(bottom) to rootA(top) to find out the path, so that same path can be traversed in tree B to get the corresponding node
  while (node !== rootA) {
    const parent = node.parentElement;
    const childs = parent.children;
    const indexOfNode = Array.from(childs).indexOf(node);
    path.unshift(indexOfNode);
    node = parent;
  }

  // traversing the same path from rootB to get the corresponding node in the identical DOM tree B where rootA and rootB is clone of each other
  let rootBClone = rootB;
  path.forEach((p) => {
    const childs = rootBClone.children;
    rootBClone = childs[p];
  });

  return rootBClone;
};
