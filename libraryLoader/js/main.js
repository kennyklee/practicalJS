// Goals
// 1. find was way to detect any dependency that has undefined, and then return undefined for the library.
// 2. build dependency checker (if greater than 1), than run the dependency builder.
// DONE: 3. Dependency builder doens't need dependency.
// 4. if dependency is undefined, then return undefined.

(function (){
    // Storage for libaries
    var libraryStorage = {};

    function librarySystem(libraryName, dependencies, callback){
        // Adding a library with it's callback and optional dependencies into store.
        if (arguments.length > 1) {
            libraryStorage[libraryName] = {
                callback: callback,
                dependencies: dependencies,
                isCached: false,
                cachedResults: null
            };
        }
        // Call a library that doesn't exsit ==> Error message in console.
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
                library.isCached = true;
                library.cachedResults = library.callback.apply(null, runDependenciesAndStoreResultsInArray);
                return library.cachedResults;
            }
            return library.cachedResults;
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

    function resetStorage() {
        libraryStorage = {};
    }

    window.librarySystem = librarySystem;
    window.resetStorage = resetStorage;
})();

