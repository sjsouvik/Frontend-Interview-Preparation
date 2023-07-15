/*

Given a input string convert the c++ variable to java variable

c++ variables have underscore in them and java variable is written in camel case

input - this_is_a_variable (As it has underscore it is c++ we need to convert to Java)
output - thisIsAVariable
    
input - meanVariableAverage(As it does not has underscore it is in Java so need to convert into c++)
output - mean_variable_average


*********************************************************Solution******************************************************/

// asked in ServiceNow

function converter(input) {
  let output = "";

  if (input.includes("_")) {
    const words = input.split("_");
    output = words[0];
    for (let i = 1; i < words.length; i++) {
      output += words[i][0].toUpperCase() + words[i].substring(1);
    }
  } else {
    for (let i = 0; i < input.length; i++) {
      const code = input.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        output += `_${input[i].toLowerCase()}`;
      } else {
        output += input[i];
      }
    }
  }

  return output;
}

console.log(converter("this_is_a_variable"));
console.log(converter("meanVariableAverage"));
