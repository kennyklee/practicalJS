function Person(first, last, age) {
  this.first = first;
  this.last = last;
  this.age = age;
}

var Gordon = { first: "gordon", last: "zhu", age: 21 };

var Kenny = new Person("kenny", "lee", 21);

tests({
    'It should return an error when a prototype is not included in the argument.': function() {
      var object1 = {};
      var object2 = {};

      eq(isPrototypeOf(null, object2), "TypeError: Error");
    },

    'It should return an error when prototype is \'undefined\'.': function() {
      var object1 = {};
      var object2 = {};

      eq(isPrototypeOf(undefined, object2), "TypeError: Error");
    },

    'It should return true when object is in another object\'s prototype chain.': function() {
      eqs(isPrototypeOf(Person.prototype, Kenny), true);
    },

    'It should return false when object is NOT in another object\'s prototype chain.': function() {
      eqs(isPrototypeOf(Person.prototype, Gordon), false);
    },

    'It should return true since \'Object\' is a prototype of \'Array\'': function() {
      eqs(isPrototypeOf(Object.prototype, Array.prototype), true);
    },

    'It should return false since \'Array\' is a prototype of \'Object\'': function() {
      eqs(isPrototypeOf(Array.prototype, Object.prototype), false);
    },

    'It should also return true if the prototype chain is indirect.': function () {
      var myDog = {};
      eq(isPrototypeOf(Object.prototype, Kenny), true);
  },
})