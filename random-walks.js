// Algorithm Sources
// http://www.complexity-explorables.org/explorables/levy/

// -- Type Declerations --------------------------------------------------------

/**
 * @typedef Point {number[]} - Two element list of x and y coordinates
 *//**
 * @typedef Rectangle {number[]} - Two element list of width and height
 *//**
 * @typedef Random {Function} A pseudo random number generator
 * @returns {number} A number from 0 to 1
 *//**
 * Get a random location within a bounded box
 * @typedef randomInBox {Function}
 * @param {Rectangle} bounding_box
 * @param {Random}    rng
 *
 * @returns {Point} The chose point withing the bounding box
 */

// -- Module Declerations ------------------------------------------------------

/**
 * @param {number[]} dimensions
 * @param {number} num_points
 * @param {Object} opts
 * @param {number} opts.step
 * @param {number} opts.rng
 */
function random(dimensions, num_points, opts) {
  const nextPoint = function(prev, rng) {
    return offset(prev, opts.step, rng);
  };

  return randomWalk({
    dimensions,
    nextPoint,
    startingPoint  : rngInBox,
    num_iterations : num_points,
    bbox           : dimensions,
    num_walkers    : opts.num_walkers,
    rng            : opts.rng
  });
}

/**
 * @param {number[]} dimensions
 * @param {number} num_points
 * @param {Object} opts
 * @param {number} opts.max_step
 * @param {number} opts.min_step
 * @param {number} opts.mu
 * @param {number} opts.rng
 * }
 */
function levyFlight(dimensions, num_points, opts) {
  const nextPoint = function(prev, rng) {
    const p_density    = r => 1 / Math.pow(r, 1 + opts.mu);
    // Clamp to the 0 - 1 range. Magic constant here
    const step_percent = Math.max(1, p_density(opts.rng()) / 1000000);
    const step_len     = lerp(opts.min_step, opts.max_step, step_percent);
    const offset_point = offset(prev, step_len, opts.rng);

    return inBox(dimensions, offset_point)
      ? offset_point
      : rngInBox(dimensions, opts.rng);
  };

  return randomWalk({
    dimensions,
    nextPoint,
    startingPoint  : rngInBox,
    num_iterations : num_points,
    bbox           : dimensions,
    num_walkers    : opts.num_walkers,
    rng            : opts.rng
  });
}

// -- Base Module --------------------------------------------------------------

/**
 * @typedef randomIteration {Function}
 * @param {Point} prev_point The last point that was iterated on
 * @param {Random} rng the input random number generator
 */

/**
 * @param {Object} opts                     All the options
 * @param {number} opts.num_iterations      The number of steps in a single walk
 * @param {number} opts.num_walkers         Number of times to run the random walk
 * @param {Rectangle} opts.bbox             The bounding box for the algorithm
 * @param {randomInBox} opts.startingPoint  The function that chooses the starting
 *                                          location for the random walk
 * @param {randomIteration} opts.nextPoint  The function that chooses where the next point
 *                                          is places based on the previous point
 * @param {Random} opts.rng                 The pseudo random number generator
 *
 * @returns {Point[]} The list of points from the random walk
 */
function randomWalk(opts) {
  const seed_point = opts.startingPoint(opts.bbox, opts.rng);
  let total_walks  = 0;
  let out_points   = [];

  let last_point;


  while (total_walks < opts.num_walkers) {
    let seed_point = opts.startingPoint(opts.bbox, opts.rng);
    let num_points = 0;
    let last_point = seed_point;
    out_points.push(seed_point);

    while (num_points < opts.num_iterations) {
      let next_point = opts.nextPoint(last_point, opts.rng);
      if (!inBox(opts.dimensions, next_point)) {
        next_point = opts.startingPoint(opts.bbox, opts.rng);
      }
      out_points.push(next_point);
      last_point = next_point;

      num_points++;
    }

    total_walks++;
  }

  return out_points;
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
  random,
  levyFlight
};
