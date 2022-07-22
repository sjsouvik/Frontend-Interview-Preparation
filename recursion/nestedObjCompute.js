/*

Write a function which can take an object as input and return the output as the following:

input: {
	a: (a, b, c) => a + b - c,
	b: (a, b, c) => a - b + c,
	c: (a, b, c) => a * b * c,
	d: {
		e: {
			f: (a, b, c) => a + b + c
		}
	}
}

output: {
	a: 1,
	b: 1,
	c: 1,
	d: {
		e: {
            f: 3
        }
	}	
}

**********************************************************************Solution*************************************************************/

// asked in CredAvenue
function compute(inputObj) {
	const res = {};
	
	return function (...args){
		for (const key of Object.keys(inputObj)) {
			if(typeof inputObj[key] === 'object'){
				res[key] = compute(inputObj[key])(...args);
			}else{
				res[key] = inputObj[key].apply(this, args);
			}
		}	

		return res;
	}
}

const input = {
	a: (a, b, c) => a + b - c,
	b: (a, b, c) => a - b + c,
	c: (a, b, c) => a * b * c,
	d: {
		e: {
			f: (a, b, c) => a + b + c
		}
	}
}

console.log('nested fn inside obj computation - ', compute(input)(1, 1, 1));
