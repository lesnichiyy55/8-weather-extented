const getArgs = (args) => {
   const res = {};
   const [exec, file, ...rest] = args;  

   rest.forEach((value, index, array) => {
        if(value.charAt(0) == '-') {
            if(index == array.length -1) {
                res[value.substring(1)] = true;
            } else if(value.substring(1) !== "-") {
                array.shift();
                res[value.substring(1)] = array;
            } else {
                res[value.substring(1)] = true;
            }
        } 
   })
   return res
};


export {getArgs};