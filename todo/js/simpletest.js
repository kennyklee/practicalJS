/**
 * Very simple in-browser unit-test library, with zero deps.
 *
 * Background turns green if all tests pass, otherwise red.
 * View the JavaScript console to see failure reasons.
 *
 * Example:
 *
 *   adder.js (code under test)
 *
 *     function add(a, b) {
 *       return a + b;
 *     }
 *
 *   adder-test.html (tests - just open a browser to see results)
 *
 *     <script src="tinytest.js"></script>
 *     <script src="adder.js"></script>
 *     <script>
 *
 *     tests({
 *
 *       'adds numbers': function() {
 *         eq(6, add(2, 4));
 *         eq(6.6, add(2.6, 4));
 *       },
 *
 *       'subtracts numbers': function() {
 *         eq(-2, add(2, -4));
 *       },
 *
 *     });
 *     </script>
 *
 * That's it. Stop using over complicated frameworks that get in your way.
 *
 * -Joe Walnes
 * MIT License. See https://github.com/joewalnes/jstinytest/
 */

// DONE: Get successes to be green
// DONE: One error per failure to the console
// DONE: Make failures red
// DONE: Show stack traces for failures
// DONE: Only show stack traces if you click expand
// DONE: Output summary statistics to the DOM
// DONE: Refactor TinyTest

var TinyTestHelper = {
    renderStats: function(tests, failures) {
        var numberOfTests = Object.keys(tests).length;
        var successes = numberOfTests - failures;
        var summaryText = "Ran " + numberOfTests + " tests: "
                          + successes + " successes, "
                          + failures + " failures"
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryText;
        document.body.appendChild(summaryElement);
    }
}

var TinyTest = {
    run: function(tests) {
        var failures = 0;
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                // console.log('%c👍  ' + testName, 'color: green;');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + Object.keys(tests).indexOf(testName) + ' 🔥 ' + testName + ' 🔥 \n%c' + e.message, 'color: red;', 'background:red; color:white;');
                console.error('%c' + e.stack);
                console.groupEnd();
            }
        }
        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                if (failures > 0) {
                    document.body.style.backgroundColor = 'red'
                }
                TinyTestHelper.renderStats(tests, failures);
            }
        }, 0);
        if (failures === 0) {
            console.log('%c👍  ALL TESTS PASSED!!! AWESOME!!! 👍', 'color: green;');
        }
    },

    fail: function(msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },
};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    eqs                = TinyTest.assertStrictEquals.bind(TinyTest), // alias
    tests              = TinyTest.run.bind(TinyTest);
