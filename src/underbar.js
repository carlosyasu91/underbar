(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var length = array.length;
    if(n>length){
      return array;
    }
    return n === undefined ? array[length-1] : array.slice(length-n,length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for(var i=0;i<collection.length;i++){
        iterator(collection[i], i, collection);
      }
    } else{
      for(var prop in collection){        
        iterator(collection[prop],prop, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];
    _.each(collection, function(element){
      if(test(element)){
        arr.push(element);
      }
    });
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    
    return _.filter(collection, function(value){
      return !test(value);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr   = [];
    var isInArray = false;
    for(var i=0;i<array.length;i++){
      for(var j=0;j<newArr.length;j++){
        if(newArr[j] === array[i]){
          isInArray = true;
        }
      }
      if(!isInArray){
        newArr.push(array[i]);
      }
      isInArray = false;
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var arr = [];
    _.each(collection, function(element){
      arr.push(iterator(element));
    });
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var initializing = arguments.length === 2;
      _.each(collection, function(element, index){
        if(initializing){
          accumulator = element;
          initializing = false; 
        } else {
          accumulator = iterator(accumulator,element);
        }
      });
      return accumulator;
  };

  //Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function(stillMatch, value){
        return stillMatch && iterator(value);
      },true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return !!_.reduce(collection, function(stillMatch, value){
        return stillMatch || iterator(value);
      },false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
   _.each(arguments,function(object){
      _.each(object, function(property, key){
        obj[key] = property;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj){
    _.each(arguments,function(object){
      _.each(object, function(property, key){
        obj[key] === undefined && (obj[key] = property);
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

_.memoize = function(func){
    var results = {};
    return function(){
      var key = JSON.stringify(arguments);
      if(!(key in results)){
        results[key] = func.apply(this, arguments);
      }
      return results[key];
    }
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arr =[];
    for(var i=2;i<arguments.length;i++){
      arr.push(arguments[i]);
    }
    return setTimeout(function(){
      return func.apply(null, arr);
    },wait);
//    window.setTimeout(func, wait, arguments[0], arguments[1]);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {    
    var result = [];
    var newArray = array.slice(0,array.length);
    var random = 0;
    while(newArray.length>0){
      random = Math.floor(Math.random()*newArray.length);
      result.push(newArray[random]);
      newArray.splice(random,1);
    }
    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var result = [];
    var str;
    _.each(collection, function(element, index){
      if(typeof functionOrKey == 'function'){
      result.push(functionOrKey.apply(element));
    } else if(typeof functionOrKey == 'string'){
      str = new String(element);
      result.push(str[functionOrKey].apply(element));
    }
    });
    return result;
  };
  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var res = [];
    var arr = [];
    var isUndefined = false;
    //SORTING OBJECTS
    //get values
    //sort values
    //iterate and find which object has that value
    //push it to the array
    if(iterator.constructor === String){
      arr = _.pluck(collection, iterator);
      arr.sort();
      _.each(arr, function(arrElement){
        _.each(collection,function(colElement){
          if(arrElement === colElement[iterator]){
            res.push(colElement);
          }
        });
      });
    } else if(iterator.constructor === Function){
      arr = _.map(collection, iterator);
      console.log(arr);
      arr.sort();
      _.each(arr, function(arrElement){
        _.each(collection,function(colElement){
          console.log("arr Element: " + arrElement + " colElement: " + colElement);
          if(arrElement === iterator(colElement) && isUndefined === false){
            res.push(colElement);
            if(arrElement === undefined)
              isUndefined = true;
          }
        });
        isUndefined = false;
      });
    }
    return res;

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var arr = [];
    var maxArguments = 0;
    var result = [];
    var current = [];
    for(var i=0;i<arguments.length;i++){
      arr.push(arguments[i]);
    }
    for(var j=0;j<arr.length;j++){
      if(arr[j].length>maxArguments){
        maxArguments = arr[j].length;
      }
    }
    for(var l=0;l<maxArguments;l++){
      current = [];
    for(var k=0;k<arr.length;k++){
      current.push(arr[k][l]);
    }
    result.push(current);
    current = [];
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {    
    var res = [];
  function explore(array){
    _.each(array, function(element){
      if(element.constructor !== Array){
          res.push(element);
        } else {
          explore(element);
        }
    })
  }
  explore(nestedArray);
    return res;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(){    
    var res = [];  
    var arr = [];
    for(var i=0;i<arguments.length;i++){
      arr.push(arguments[i]);
    }
    function intersect(first, second){
      var res = [];
      for(var i=0;i<first.length;i++){
        var isThere = false;
        for(var j=0;j<second.length;j++){
          if(first[i] === second[j]){
            isThere = true;
          }
        }
        if(isThere){
          res.push(first[i]);
        }
      }
      return res;
    }
    res = _.reduce(arr,intersect);
    return res;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var base = arguments[0];
    var result = [];
    _.each(base, function(element){ result.push(element);});
    var remaining = [];
    var modifier = 0;
    for(var i=1;i<arguments.length;i++){
      remaining.push(arguments[i]);
    }
    console.log(remaining);
    _.each(base, function(baseElement, i){
      _.each(remaining, function(checkArray){
        _.each(checkArray, function(checkElement){
          if(baseElement == checkElement){
            result.splice(i-modifier,1);
            modifier++;
          }
        });
      });
    });
    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

  };
}());
