/*

I believe you've used JSON.stringify() before, do you know the details of how it handles arbitrary data?

Please have a guess on the details and then take a look at the explanation on MDN, it is actually pretty complex.

In this problem, you are asked to implement your own version of JSON.stringify().

In a real interview, you are not expected to cover all the cases, just decide the scope with interviewer. 
But for a goal of practicing, your code here will be tested against a lot of data types. Please try to cover as much as you can.

Attention to the circular reference.

note

JSON.stringify() support two more parameters which is not required here.

*********************************************************************Solution**********************************************************/


/**
 * @param {any} data
 * @return {string}
 */
 function stringify(data) {    
    if([NaN, null, Infinity].includes(data)){
      return 'null';
    }
  
    if(typeof data === 'function' || data === undefined || typeof data === 'symbol'){
      return undefined;
    }
    
    if(typeof data === 'bigint'){
      throw new Error("BigInt value can't be serialized in JSON");
    }
  
    let output;
  
    if(Array.isArray(data)){        
      output = `[${data.map(d => stringify(d))}]`;
    }else if(data instanceof Date){
      output = `"${data.toISOString()}"`;
    }else if(typeof data === 'object'){
      output = Object.entries(data).reduce((acc, [key, value])=>{
        if(value === undefined){
          return acc;
        }
  
        acc.push(`"${key}":${stringify(value)}`);
        return acc;
      }, [])
  
      output = `{${output.join()}}`;
    }else if(typeof data === 'string'){    
      output = `"${data}"`;
    }else{
      output = String(data);
    }
  
    return output;
  }