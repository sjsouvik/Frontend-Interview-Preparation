/*

Implement your own split() for strings.

******************************************************************Solution***************************************************/

String.prototype.mySplit = function (separator){
	if(separator === undefined){
		return [this];
	}
	
	const str = this, res = [];	

	if(separator.length === 0){
		for(const char of str){
			res.push(char);
		}

		return res;
	}

	let word = "", matchedPart = "", j = 0;
	for(const currentChar of str){		
		if(currentChar === separator[j]){
			if(j === separator.length - 1){
				res.push(word);
				word = "";
				matchedPart = "";
				j = 0;
			}else{
				matchedPart += currentChar;
				j++;
			}
		}else{
			if(j){				
				j = 0;
				word += matchedPart + currentChar;
				matchedPart = "";
			}else{				
				word += currentChar;
			}			
		}			
	}

	if(word){		
		res.push(word);
	}
	
	return res;
}

const strTest = "abxc abdef";
console.log('Split testing', strTest.split("ab"))
console.log('polyfill testing of String.split() -', strTest.mySplit("ab"))