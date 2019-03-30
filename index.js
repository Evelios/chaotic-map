(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.chaoticMap = factory());
}(this, function () { 'use strict';

  // Algorithm Sources
  // http://www.complexity-explorables.org/explorables/strange/

  // -- Type Declerations --------------------------------------------------------

  /**
   * @typedef Point {number[]} - Two element list of x and y coordinates
   *//**
   * @typedef Rectangle {number[]} - Two element list of width and height
   *//**
   * @typedef Random {Function} A pseudo random number generator
   * @returns {number} A number from 0 to 1
   */

  // -- Module Declerations ------------------------------------------------------

  function clifford(opts) {
    return [];
  }

  function bedhead(opts) {
    return [];
  }

  function fractalDream(opts) {
    return [];
  }

  function gumowskiMira(opts) {
    return [];
  }

  // -- Module Exports -----------------------------------------------------------

  var chaoticMap = {
    clifford,
    bedhead,
    fractalDream,
    gumowskiMira
  };

  return chaoticMap;

}));
