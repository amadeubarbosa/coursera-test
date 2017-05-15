// https://davidwalsh.name/es6-generators

function *foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y / 3);
    console.log("DEBUG: x="+x,"y="+y,"z="+z)
    return (x + y + z);
}

var it = foo( 5 );

console.log(it.next())
console.log(it.next(12))
console.log(it.next(13))
