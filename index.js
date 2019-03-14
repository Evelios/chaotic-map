(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.randomWalks = factory());
}(this, function () { 'use strict';

  // Algorithm Sources
  // http://www.complexity-explorables.org/explorables/levy/

  function random(dimensions, num_points, rng) {
    return randomWalk(dimensions, num_points, rngInBox, rng)
  }

  function randomWalk(dimensions, num_points, pointFn, rng=Math.random) {
    const seed_point = pointFn(null, dimensions, rng);

    let out_points = [seed_point];
    let last_point = seed_point;
    let next_point = null;

    while (num_points > 1) {
      next_point = pointFn(last_point, dimensions, rng);
      out_points.push(next_point);
      last_point = next_point;

      num_points--;
    }

    return out_points;
  }

  function rngInBox(prev, bbox, rng) {
    return [
      rng() * bbox[0],
      rng() * bbox[1]
    ];
  }

  var randomWalks = {
    random
  };

  return randomWalks;

}));
