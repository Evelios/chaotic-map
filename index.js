(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.randomWalks = factory());
}(this, function () { 'use strict';

  // Algorithm Sources
  // http://www.complexity-explorables.org/explorables/levy/


  /**
   * @param dimensions {[number, number]}
   * @param num_points {number}
   * @param opts {
   *   rng {number}
   * }
   */
  function random(dimensions, num_points, opts) {
    const seed_point = rngInBox(dimensions, opts.rng);

    return randomWalk(dimensions, seed_point, num_points, rngInBox, opts)
  }

  /**
   * @param dimensions {[number, number]}
   * @param num_points {number}
   * @param opts {
   *   max_step {number}
   *   min_step {number}
   *   mu       {number}
   *   rng      {number}
   * }
   */
  function levyFlight(dimensions, num_points, opts) {
    const seed_point = rngInBox(dimensions, opts.rng);

    const nextPoint = (bbox, rng, prev) => {
      const p_density    = r => 1 / Math.pow(r, 1 + opts.mu);
      // Clamp to the 0 - 1 range. Magic constant here
      const step_percent = Math.max(1, p_density(rng()) / 1000000);
      const step_len     = lerp(opts.min_step, opts.max_step, step_percent);
      const offset_point = offset(prev, step_len, rng);

      return inBox(dimensions, offset_point)
        ? offset_point
        : rngInBox(dimensions, opts.rng);
    };


    return randomWalk(dimensions, seed_point, num_points, nextPoint, opts)
  }

  /**
   * @param dimensions {[width, height]}
   * @param seed_point {Point}
   * @param num_points {number}
   * @param pointFn {}
   * @param opts {
   *   rng {number}
   *
  //   ---- Still To Implement
  //   startingPoint
   * }
   *
   * @returns {Point[]} The list of points from the random walk
   */
  function randomWalk(dimensions, seed_point, num_points, pointFn, opts) {

    let out_points = [seed_point];
    let last_point = seed_point;
    let next_point = null;

    while (num_points > 1) {
      next_point = pointFn(dimensions, opts.rng, last_point);
      out_points.push(next_point);
      last_point = next_point;

      num_points--;
    }

    return out_points;
  }

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
    return v0*(1-t)+v1*t;
  }

  function offset(vec, r, rng) {
    const angle = 2*Math.PI * rng();

    return [
      vec[0] + Math.cos(angle) * r,
      vec[1] + Math.sin(angle) * r
    ];
  }

  var randomWalks = {
    random,
    levyFlight
  };

  return randomWalks;

}));
