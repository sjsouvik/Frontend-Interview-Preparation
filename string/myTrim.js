/*

String.prototype.trim() is commonly used when processing strings.

It is very easy, can you implement your own one?

*******************************************************************Solution***********************************************************/


/**
 * @param {string} str
 * @return {string}
 */
 function myTrim(str) {  
    const spaces = [' ', '\t', '\u3000'];  
  
    // to trim spaces from the beginning of the string
    for(let i = 0; i < str.length; i++){
      if(!spaces.includes(str[i])){
        str = str.substring(i);
        break;
      }    
    }
  
    // to trim spaces from the end of the string
    for(let i = str.length - 1; i >= 0; i--){
      if(!spaces.includes(str[i])){
        str = str.substring(0, i + 1);
        break;
      }    
    }      
  
    return str;
  }


// Recursive Solution:

function recursiveTrim(str) {  
    const spaces = [' ', '\t', '\u3000'];      
  
    // to trim spaces from the beginning of the string
    if(spaces.includes(str[0])){
      return recursiveTrim(str.slice(1));
    }
  
    // to trim spaces from the end of the string
    if(spaces.includes(str[str.length - 1])){
      return recursiveTrim(str.slice(0, str.length - 1));
    }
  
    return str;
  }