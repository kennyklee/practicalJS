(function (){
    function isPrototypeOf(prototypeObj, object) {
        //debugger;
        // Not passing in an argument
        if ((prototypeObj === undefined) || (prototypeObj === null)) {
            return new TypeError("Error");
        }

        // if (prototypeObj.prototype === undefined) {
        //     return "You did not pass in a prototype."
        // }

        if (prototypeObj === object) {
            return false;
        }

        if (prototypeObj === Object.getPrototypeOf(object)) {
            return true;  // If the prototype is the same, then they are NOT a prototype of each other.
        }
        return false;
    }

    window.isPrototypeOf = isPrototypeOf;
}() );
