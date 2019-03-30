"use strict";

// User Parameters
let params = {

  // Global Parameters
  seed       : 1,
  num_points : 300,
  opacity    : 1,
  alpha      : 1,
  beta       : 1,
  gamma      : 1,
  delta      : 1,

  algorithm   : "clifford",
  algorithms  : [
    "clifford",
    "bedhead",
    "fractalDream",
    "gumowskiMira"
  ],
};

// Colors
const bgColor         = tinycolor("#303030");
const bgAccent        = tinycolor("#393939");
const primaryColor    = tinycolor("#AA7539");
const secondaryColor  = tinycolor("#A23645");
const tertiaryColor   = tinycolor("#27566B");
const quaternaryColor = tinycolor("#479030");

const point_color = primaryColor;

// Globals
let width;
let height;
let bbox;
let points;
let rng;

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

  // This can probably be tamed down a bit and pulled into a wrapper function
  gui.add(params, "seed", 1, 5, 1).name("RNG Seed").onChange(createAndRender);
  gui.add(params, "num_points", 1, 1000, 1).name("Num Points").onChange(createAndRender);
  gui.add(params, "opacity", 0, 1, 0.05).name("Opacity").onChange(render);
  gui.add(params, "alpha", 0, 1, 0.05).name("Alpha").onChange(createAndRender);
  gui.add(params, "beta", 0, 1, 0.05).name("Beta").onChange(createAndRender);
  gui.add(params, "gamma", 0, 1, 0.05).name("Gamma").onChange(createAndRender);
  gui.add(params, "delta", 0, 1, 0.05).name("Delta").onChange(createAndRender);
  gui.add(params, "algorithm", params.algorithms).name("Algorithm").onChange(changeParameters);
}


function guiAndCreateAndRender() {
  setUpGui();
  createAndRender();
}

function parametersAndCreateAndRender() {
  changeParameters();
  createAndRender();
}

function changeParameters() {
}

function createAndRender() {
  rng = Alea(params.seed);
  create();
  render();
}

function create() {
  const algorithm = chaoticMap[params.algorithm];
  const options = {
    alpha : params.alpha,
    beta  : params.beta,
    gamma : params.gama,
    delta : params.delta
  };

  points = algorithm(options);
}

function render() {
  background(bgColor.toHex8String());

  // Draw all the points
  noStroke();
  fill(point_color.setAlpha(params.opacity).toHex8String());
  points.forEach((point, i, points) => {

    const ellipse_size = 5;
    ellipse(point[0], point[1], ellipse_size);
  });
}
