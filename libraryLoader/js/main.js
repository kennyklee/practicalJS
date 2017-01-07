function foo(){
    // Storage for libaries
    libraryStorage = {};

    function librarySystem(libraryName, dependencies, callback){
        // Adding a library with optional dependencies.
        if (arguments.length > 1) {
            libraryStorage[libraryName] = {
                callback: callback,
                dependencies: dependencies
            };
        }
        // Call a library that doesn't exsit ==> Error message in console.
        else if (libraryStorage[libraryName] === undefined) {
            return 'Library doesn\'t exist.';
        }
        // Call a library that exists.
        else {
            var libraryDependencies = libraryStorage[libraryName].dependencies.map(function(dependency) {
                return librarySystem(dependency);
            });
            return libraryStorage[libraryName].callback.apply(this, libraryDependencies);
        }
    }
    window.librarySystem = librarySystem;
};

foo();

