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

// -- Helper Functions ---------------------------------------------------------

function rngInBox(bbox, rng) {
  return [
    rng() * bbox[0],
    rng() * bbox[1]
  ];
}

function inBox(bbox, point) {
  return point[0] > 0 && point[0] < bbox[0] &&
         point[1] > 0 && point[1] < bbox[1];
}

function lerp(v0, v1, t) {
  return v0 * (1-t) + v1 * t;
}

// ---- Vectors ----

function offset(vec, r, rng) {
  const angle = 2*Math.PI * rng();
  return [
    vec[0] + Math.cos(angle) * r,
    vec[1] + Math.sin(angle) * r
  ];
}

function add(v1, v2) {
  return [
    v1[0] + v2[0],
    v1[1] + v2[1]
  ];
}

function polar(r, theta) {
  return [
    r *  Math.cos(theta),
    r * -Math.sin(theta)
  ];
}

// -- Module Exports -----------------------------------------------------------

export default {
  clifford,
  bedhead,
  fractalDream,
  gumowskiMira
};
