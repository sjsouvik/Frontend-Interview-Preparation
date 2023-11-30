/*

Given one array of objects in which each item has parent-child relationship(there's a parentId property for each item 
in the array, parentId of the root item will be ""), we need to transform that into an object where each item will have
the childs property containing all the childs of the object. Sort the childs based on their number of childs in increasing 
order and add label for each child. Add the label by combining parent's label and the position of the child item in the 
childs array, for example, if the parent's label is "1.0" and the position of the child in the array is 1, then the label 
for that child should be "1.0.1".

*/

// asked in ServiceNow

const rawJson = [
  {
    id: "1",
    parentId: "",
    name: "abc",
    description: "",
  },
  {
    id: "2",
    parentId: "1",
    name: "abc def",
    description: "",
  },
  {
    id: "3",
    parentId: "1",
    name: "abc def",
    description: "",
  },
  {
    id: "22",
    parentId: "2",
    name: "jkl",
    description: "",
  },
  {
    id: "21",
    parentId: "2",
    name: "abc def",
    description: "",
  },
  {
    id: "211",
    parentId: "21",
    name: "abc def",
    description: "",
  },
  {
    id: "212",
    parentId: "21",
    name: "xyz",
    description: "",
  },
  {
    id: "213",
    parentId: "21",
    name: "mno",
    description: "",
  },
];

const addLabel = (obj) => {
  obj = {
    ...obj,
    childs: obj.childs.map((item, index) => ({
      ...item,
      label: `${obj.label}.${index + 1}`,
    })),
  };

  const updatedChilds = obj.childs.map((child) => addLabel(child));
  return { ...obj, childs: updatedChilds };
};

const sortObj = (obj) => {
  obj = {
    ...obj,
    childs: [...obj.childs].sort((a, b) => a.childs.length - b.childs.length),
  };

  const updatedChilds = obj.childs.map((child) => sortObj(child));
  return { ...obj, childs: updatedChilds };
};

const addItem = (item, data) => {
  if (item.parentId === data.id) {
    return { ...data, childs: [...data.childs, item] };
  }

  const latestData = data.childs.map((child) => addItem(item, child));
  return { ...data, childs: latestData };
};

const transformToObj = (input) => {
  let obj = { id: "1", childs: [], label: "1.0" };

  for (const item of input) {
    obj = addItem({ ...item, childs: [] }, obj);
  }

  const sortedObj = sortObj(obj);
  return addLabel(sortedObj);
};

console.log(transformToObj(rawJson));
