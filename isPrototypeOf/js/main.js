(function (){
    function isPrototypeOf(prototype, object) {
        var protoOfObject = Object.getPrototypeOf(object);

        if ((prototype === undefined) || (prototype === null)) {
            return new TypeError("Error");
        }

        if ((protoOfObject === undefined) || (protoOfObject === null)) {
            return false;
        }

        if (prototype === protoOfObject) {
            return true;
        } else {
            return isPrototypeOf(prototype, protoOfObject);
        }
    }

    window.isPrototypeOf = isPrototypeOf;
}());
