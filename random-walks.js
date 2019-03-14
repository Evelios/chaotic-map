// Algorithm Sources
// http://www.complexity-explorables.org/explorables/levy/

function random(dimensions, num_points, rng) {
  return randomWalk(dimensions, num_points, rngInBox, rng)
}

function randomWalk(dimensions, num_points, pointFn, rng=Math.random) {
  const density_fn = density instanceof Function ? density : () => density;
  const [width, height] = dimensions;
  const seed_point = pointFn(null, dimensions, rng);

  let out_points = [seed_point];
  let last_point = seed_point;
  let next_point = null;

  while (num_points > 1) {
    next_point = pointFn(last_point, dimensions, rng);
    out_points.push(next_point);
    last_point = next_point

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

function inBox(bbox, point) {
  return point[0] > 0 && point[0] < bbox[0] &&
         point[1] > 0 && point[1] < bbox[1];
}

export default {
  random
};
