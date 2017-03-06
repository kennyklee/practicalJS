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