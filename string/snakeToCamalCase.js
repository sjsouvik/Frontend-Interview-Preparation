/*

Do you prefer snake_case or camelCase ?

Anyway, please create a function to convert snake_case to camcelCase.


snakeToCamel('snake_case') 
// 'snakeCase'
snakeToCamel('is_flag_on') 
// 'isFlagOn'
snakeToCamel('is_IOS_or_Android') 
// 'isIOSOrAndroid'
snakeToCamel('_first_underscore') 
// '_firstUnderscore'
snakeToCamel('last_underscore_') 
// 'lastUnderscore_'
snakeToCamel('_double__underscore_') 
// '_double__underscore_'
contiguous underscore __, leading underscore _a, and trailing underscors a_ should be kept untouched.

***********************************************************************Solution********************************************************/


/**
 * @param {string} str
 * @return {string}
 */
 function snakeToCamel(str) {  
    let result = str[0];
   
    for(let i = 1; i < str.length; i++){
      const currentChar = str[i];
  
      // if currentChar is '_' and previous and next character of currentChar is not equal to '_' then include the next character of currentChar with upperCase()
      if(currentChar === '_' && str[i - 1] !== '_' && str[i + 1] !== '_' && i < str.length - 1){
        result += str[i + 1].toUpperCase();
        i++;
      }else{
        result += str[i];
      }
    }
  
    return result;
  }