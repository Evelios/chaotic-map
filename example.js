"use strict";

// Colors
var bgColor = tinycolor("#303030");
var bgAccent = tinycolor("#393939");
var primaryColor = tinycolor("#AA7539");
var secondaryColor = tinycolor("#A23645");
var tertiaryColor = tinycolor("#27566B");
var quaternaryColor = tinycolor("#479030");

// Globals
var width;
var height;
var bbox;
var points;
var rng;

var params = {
  // Parameters
  seed: 1,
  num_points: 50,
  jitter: 0,
};

function setup() {
  width = document.body.clientWidth || window.innerWidth;
  height = document.body.clientHeight || window.innerHeight;
  bbox = [width, height];

  createCanvas(width, height);

  setUpGui();
  createAndRender();
}

function setUpGui() {
  var gui = new dat.GUI();

  gui.add(params, "seed", 1, 5, 1).name("RNG Seed").onChange(createAndRender);
  gui.add(params, "num_points", 1, 1000, 1).name("Num Points").onChange(createAndRender);
  gui.add(params, "jitter", 0, 2, 0.1).name("Point Jitter").onChange(createAndRender);
}

function createAndRender() {
  rng = Alea(params.seed);
  create();
  render();
}

function create() {
  points = randomWalks(bbox, params.num_points, rng);

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
  for (var point of points) {
    const ellipse_size = 5;
    ellipse(point[0], point[1], ellipse_size);
  }
}
