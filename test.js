var add = function(a) {
    if(a === 0) {
        return 0;
    } else {
        return function(b) {
            if(add) console.log(add);
            else console.log('***');
            return a + add.apply(this, arguments);
        }
    }
}

console.log(add(1)(2)(3));

