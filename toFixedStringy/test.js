// Kenny's original tests.

tests({
    '"abc" should return a "It\'s not a number"': function() {
      eqs( toFixedStringy("abc", 2), "It's not a number." );
    },

    'Precision less than 0 should return an error': function() {
      eqs( toFixedStringy(1.005, -1), "Enter 'precision' between 0 and 20." );
    },

    'Precision greater than 20 should return an error': function() {
      eqs( toFixedStringy(1.005, 21), "Enter 'precision' between 0 and 20." );
    },

    '"100" with 5 precision shoud return "100.00000"': function() {
        var oneHundred = 100;
        eqs( toFixedStringy(100, 20), oneHundred.toFixed(20) );
    },

    '".005" with 2 precision shoud return "0.01"': function() {
        var oneHundred = 100;
        eqs( toFixedStringy(.005, 2), 0.01 );
    },

    '"1.005" with 2 precision return "1.01"': function() {
      eqs( toFixedStringy(1.005, 2), 1.01 );
    },

    '"12314.12342145" with 7 precision return "12314.1234215"': function() {
      eqs( toFixedStringy(12314.12342145, 7), 12314.1234215 );
    }
})

// Jason's tests. Thanks bro.

tests({
   'should return .62': function() {
       var testOne = toFixedStringy(.615, 2);
       eq(testOne, .62);
   },
   'should return 10.24': function() {
       var testTwo = toFixedStringy(10.235, 2);
       eq(testTwo === 10.24, true);
   },
   'should return 1.01': function() {
       var testThree = toFixedStringy(1.005, 2);
       eq(testThree, 1.01);
   },
   'should return .236': function() {
       var testFour = toFixedStringy(.2356, 3);
       eq(testFour === .236, true);
   },
   'should return 10.7': function() {
       var testFive = toFixedStringy(10.678, 1);
       eq(testFive, 10.7);
   },
   'should return 10': function() {
       var testSix = toFixedStringy(10.235, 0);
       eq(testSix === 10, true);
   },
   'should return 11': function() {
       var testSeven = toFixedStringy(10.635, 0);
       eq(testSeven, 11);
   },
   'should return 1.00201': function() {
       var testSeven = toFixedStringy(1.002005, 5);
       eq(testSeven, 1.00201);
   }
});