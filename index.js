(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.randomWalks = factory());
}(this, function () { 'use strict';

  // Algorithm Sources
  // http://www.complexity-explorables.org/explorables/levy/

  function levyFlight(dimensions, density, rng=Math.random, num_points=10) {
    const seed_point = rngInBox(dimensions, rng);

    let out_points = [seed_point];
    let last_point = seed_point;
    let next_point = null;

    while (num_points > 1) {
      next_point = nextPoint(last_point, dimensions, rng);
      out_points.push(next_point);
      last_point = next_point;

      num_points--;
    }

    console.log(out_points);
    return out_points;
  }

  function rngInBox(bbox, rng) {
    return [
      rng() * bbox[0],
      rng() * bbox[1]
    ];
  }

  function nextPoint(prev, bbox, rng) {
    return rngInBox(bbox, rng);
  }

  return levyFlight;

}));
