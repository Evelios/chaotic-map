"use strict";

// Colors
const bgColor         = tinycolor("#303030");
const bgAccent        = tinycolor("#393939");
const primaryColor    = tinycolor("#AA7539");
const secondaryColor  = tinycolor("#A23645");
const tertiaryColor   = tinycolor("#27566B");
const quaternaryColor = tinycolor("#479030");

// Globals
let width;
let height;
let bbox;
let points;
let rng;

let params = {
  // Parameters
  seed       : 1,
  num_points : 50,
  jitter     : 0,
  algorithm  : "random",

  algorithms : [
    "random"
  ],
};

function setup() {
  width  = document.body.clientWidth  || window.innerWidth;
  height = document.body.clientHeight || window.innerHeight;
  bbox   = [width, height];

  createCanvas(width, height);

  setUpGui();
  createAndRender();
}

function setUpGui() {
  let gui = new dat.GUI();

  gui.add(params, "seed", 1, 5, 1).name("RNG Seed").onChange(createAndRender);
  gui.add(params, "num_points", 1, 1000, 1).name("Num Points").onChange(createAndRender);
  gui.add(params, "jitter", 0, 20, 1).name("Point Jitter").onChange(createAndRender);
  gui.add(params, "algorithm", params.algorithms).name("Algorithm").onChange(createAndRender);
}

function createAndRender() {
  rng = Alea(params.seed);
  create();
  render();
}

function create() {
  const algorithm = randomWalks[params.algorithm];
  points = algorithm(bbox, params.num_points, rng);

  // Apply jitter
  points = points.map(vec => {
    const angle = 2*Math.PI * rng();
    return [
      vec[0] + Math.cos(angle) * params.jitter,
      vec[1] + Math.sin(angle) * params.jitter
    ];
  });
}

function render() {
  background(bgColor.toHexString());

  noStroke();
  fill(primaryColor.toHexString());
  for (const point of points) {
    const ellipse_size = 5;
    ellipse(point[0], point[1], ellipse_size);
  }
}
