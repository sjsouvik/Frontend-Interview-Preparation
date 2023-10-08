/**
 
 Write a function which can take an object as input and flatten the object as following:
 
 input: 
  name: "Souvik",
  address: {
    location: {
      state: "West bengal",
      city: "Kharagpur",
    },
  },
};
  
 output: {
  user_name: "Souvik",
  user_address_location_state: "West bengal",
  user_address_location_city: "Kharagpur",
};

 * 
 */

const user = {
  name: "Souvik",
  address: {
    location: {
      state: "West Bengal",
      city: "Kharagpur",
    },
  },
};

// asked in Microsoft
function flattenObject(inputObj, parent, output) {
  for (let key in inputObj) {
    const objKey = parent + "_" + key;
    if (typeof inputObj[key] === "object") {
      output = flattenObject(inputObj[key], objKey, output);
    } else {
      output[objKey] = inputObj[key];
    }
  }

  return output;
}

console.log(flattenObject(user, "", {}));

// asked in amber student - to solve the same problem using reduce() method
function flattenObj(input, parent = "user") {
  return Object.keys(input).reduce((acc, key) => {
    const objKey = parent ? `${parent}_${key}` : key;

    if (typeof input[key] === "object") {
      acc = { ...acc, ...flattenObj(input[key], objKey) };
    } else {
      acc[objKey] = input[key];
    }

    return acc;
  }, {});
}

console.log(flattenObj(user));
