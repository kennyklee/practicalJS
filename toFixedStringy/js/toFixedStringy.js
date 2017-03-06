function toFixedStringy(num, precision) {
    // Input validations
    if (isNaN(num)) {
        return "It's not a number.";
    }
    if (precision < 0 || precision > 20) {
        return "Enter 'precision' between 0 and 20."
    }

    // Convert number into array
    var numArr = num.toString().split('');

    // Find index of decimal (ES6 - cheating?)
    function getDecimalPosition(arr) {
        return arr.findIndex( function(index) {
            return index === '.'
        });
    }

    var originalDecimalIndex = getDecimalPosition(numArr);

    // Numbers without decimals
    if (originalDecimalIndex === -1) {
        var addPrecision = "."
        for ( var i = 0; i < precision; i++ ) {
            addPrecision += "0";
        }
        return num + addPrecision;
    } else {

        /*
        *  STEPS
        *  1) Move decimal point right - use 'precision number'
        *  2) Truncate number to 1 number after the decimal point
        *  3) Round number - Convert to number then Math.round().
        *  4) Move decimal point left by dividing by ten based precision, and return a number
        *
        *  Note: Using custom 'spliced' function. Same as 'splice', but returns the modified array.
        */

        // Step 1
        var movedDecimalNum = numArr.spliced(originalDecimalIndex,1)
            .spliced( (originalDecimalIndex + precision), 0, '.');

        // Step 2
        var tempDecimalIndex = getDecimalPosition(movedDecimalNum);
        var truncatedNum = movedDecimalNum.spliced(tempDecimalIndex + 2);

        // Step 3
        var roundedNum = Math.round(truncatedNum.join(''));

        // Step 4
        // Divisor for precision
        var tenBasedPrecision = "1";
        for ( var i = 0; i < precision; i++ ) {
            tenBasedPrecision += "0";
        }

        // Final output
        return roundedNum / Number(tenBasedPrecision);
    }
}

// This does the same exact thing as .splice(); but, it returns the original
// array reference rather than the collection of items that were deleted.
/* CREDIT:
 * https://www.bennadel.com/blog/2636-spliced---a-version-of-splice-that-returns-the-original-array-in-javascript.htm
 */
Array.prototype.spliced = function() {
    // Returns the array of values deleted from array.
    Array.prototype.splice.apply( this, arguments );
    // Return current (mutated) array array reference.
    return( this );
};