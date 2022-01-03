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
    if (typeof inputObj[key] === "object") {
      output = flattenObject(inputObj[key], parent + "_" + key, output);
    } else {
      output[parent + "_" + key] = inputObj[key];
    }
  }

  return output;
}

console.log(flattenObject(user, "user", {}));
