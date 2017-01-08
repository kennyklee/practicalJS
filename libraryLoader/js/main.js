(function (){
    // Storage for libaries
    var libraryStorage = {};

    function librarySystem(libraryName, dependencies, callback){
        // Adding a library with it's callback, optional dependencies, and cache flag as actual results.
        if (arguments.length > 1) {
            libraryStorage[libraryName] = {
                callback: callback,
                dependencies: dependencies,
                isCached: false,
                cachedResults: null
            };
        }
        // Call a library that doesn't exsit ==> 'undefined'
        else if (libraryStorage[libraryName] === undefined) {
            return undefined;
        }
        // Call a library that exists.
        else {
            var library = libraryStorage[libraryName];
            var runDependenciesAndStoreResultsInArray = dependencyBuilder(library);

            // If one or more of the dependency is undefined, return 'undefined'
            if ((runDependenciesAndStoreResultsInArray.indexOf(undefined) >= 0)) {
                return undefined
            }

            // If library has not been loaded, pass in dependencies.
            if (library.isCached === false) {

                // Insert the results of the dependencies into the library's arguments.
                library.isCached = true;  // flag as cached
                library.cachedResults = library.callback.apply(null, runDependenciesAndStoreResultsInArray); // cache the results
                return library.cachedResults; // return the results
            }
            // If library has already been cached, just return the cached results.
            if (library.isCached === true) {
                return library.cachedResults;
            }
        }
    }

    // Run dependencies and return an array that has the results.
    function dependencyBuilder(libraryName) {
        // Retreiving the results of the dependencies, which are essentially libraries, and store in array.
        var libraryDependencies = libraryName.dependencies.map(function(dependency) {
            return librarySystem(dependency);
        });
        return libraryDependencies;
    }

    // Used for only tests
    function resetStorage() {
        libraryStorage = {};
    }

    window.librarySystem = librarySystem;
    window.resetStorage = resetStorage;
})();

