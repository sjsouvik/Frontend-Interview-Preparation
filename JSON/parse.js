/*

Believe you are already familiar with JSON.parse(), could you implement your own version?

In case you are not sure about the spec, MDN here might help.

JSON.parse() support a second parameter reviver, you can ignore that.

*******************************************************************Solution***********************************************************/

/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
 function parse(str) {
    // JSON.parse() doesn't allow single quote and invalid JSON
    if(str[0] === "'" || str === ''){
      throw new Error();
    }
  
    if(str === '{}'){
      return {};
    }
  
    if(str === '[]'){
      return [];
    }
  
    if(str === 'true'){
      return true;
    }
  
    // to filter only numbers, if it's not number and gets converted to NaN then, NaN === NaN evaluates to false
    if(Number(str) === Number(str)){
      return Number(str);
    }
    
    if(str === 'false'){
      return false;
    }  
  
    if(str === 'null'){
      return null;
    }  
  
    let output;
    const firstCharacter = str[0];
    const stringifiedJSONWithoutDoubleQuotes = str.slice(1, -1); // to get the string except first and last character of stringified JSON as first and last character contains ", " respectively(double quotes)
  
    if(firstCharacter === '"'){
      output = stringifiedJSONWithoutDoubleQuotes;
    }else if(firstCharacter === '{'){
      output = stringifiedJSONWithoutDoubleQuotes.split(",").reduce((acc, item)=>{
        const indexOfKeyValueSeparator = item.indexOf(":");
        const key = item.substring(0, indexOfKeyValueSeparator);
        const value = item.substring(indexOfKeyValueSeparator + 1);
  
        acc[parse(key)] = parse(value);
        return acc;
      }, {});
    }else if(firstCharacter === '['){
      output = stringifiedJSONWithoutDoubleQuotes.split(',').map(item => parse(item));
    }
  
    return output;
  }