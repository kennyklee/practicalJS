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
            libraryStorage[libraryName] = libraryStorage[libraryName].callback.apply(this, libraryDependencies);
            return libraryStorage[libraryName];
        }
    }
    window.librarySystem = librarySystem;

    //TESTS
    tests({
        'Load an unavailable library': function() {
            // Clear the libraryStorage for test.
            libraryStorage = {};
            eqs(librarySystem('name'), 'Library doesn\'t exist.');
        },

        'Load a single library': function() {
            // Clear the libraryStorage for test.
            libraryStorage = {};
            librarySystem('name', [], function(){
                return 'kenny';
            })
            eqs(librarySystem('name'), 'kenny');
        },

        'Load a library with a single dependency': function() {
            // Clear the libraryStorage for test.
            libraryStorage = {};
            librarySystem('name', [], function() {
                return 'kenny';
            });

            librarySystem('workBlurb', ['name'], function(name) {
                return name + ' works at a startup.';
            });

            eqs(librarySystem('workBlurb'), 'kenny works at a startup.');
        },

    'Load a library with 2 dependencies': function() {
      // Clear the libraryStorage for test.
      libraryStorage = {};
      librarySystem('name', [], function() {
        return 'kenny';
      });

      librarySystem('company', [], function() {
        return 'Weblife';
      });

      librarySystem('workBlurb', ['name', 'company'], function(name, company) {
        return name + ' works at ' + company;
      });

      eqs(librarySystem('workBlurb'), 'kenny works at Weblife');
    },

    'Load a library with 3 dependencies': function() {
      // Clear the libraryStorage for test.
      libraryStorage = {};
      librarySystem('name', [], function() {
        return 'Kenny';
      });

      librarySystem('company', [], function() {
        return 'Weblife';
      });

      librarySystem('coworker', [], function() {
        return 'Bob';
      });

      librarySystem('workBlurb', ['name', 'company', 'coworker'], function(name, company, coworker) {
        return name + ' works at ' + company + ' with ' + coworker;
      });
      eqs(librarySystem('workBlurb'), 'Kenny works at Weblife with Bob');
    },

    'Load a library with multiple dependencies out of order': function() {
      // Clear the libraryStorage for test.
      libraryStorage = {};
      librarySystem('workBlurb', ['name', 'company'], function(name, company) {
        return name + ' works at ' + company;
      });

      librarySystem('name', [], function() {
        return 'Gordon';
      });

      librarySystem('company', [], function() {
        return 'Watch and Code';
      });
      eqs(librarySystem('workBlurb'), 'Gordon works at Watch and Code'); // 'Gordon works at Watch and Code'
    }
    });
      // Reset at the end of test
    //libraryStorage = {};
};

foo();

