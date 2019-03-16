"use strict";

// Colors
const bgColor         = tinycolor("#303030");
const bgAccent        = tinycolor("#393939");
const primaryColor    = tinycolor("#AA7539");
const secondaryColor  = tinycolor("#A23645");
const tertiaryColor   = tinycolor("#27566B");
const quaternaryColor = tinycolor("#479030");

const point_colors = [
  primaryColor,
  secondaryColor,
  tertiaryColor,
  quaternaryColor
];

// Globals
let width;
let height;
let bbox;
let points;
let rng;

let params = {
  // Parameters
  seed        : 1,
  num_points  : 3000,
  jitter      : 0,
  min_step    : 5,
  max_step    : 20,
  mu          : 1,
  draw_colors : false,
  algorithm   : "levyFlight",

  algorithms : [
    "random",
    "levyFlight"
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
  gui.add(params, "num_points", 1, 10000, 1).name("Num Points").onChange(createAndRender);
  gui.add(params, "jitter", 0, 20, 1).name("Point Jitter").onChange(createAndRender);
  gui.add(params, "min_step", 1, 20, 1).name("Min Step").onChange(createAndRender);
  gui.add(params, "max_step", 5, 50, 5).name("Max Step").onChange(createAndRender);
  gui.add(params, "mu", 0.5, 3, 0.1).name("Mu").onChange(createAndRender);
  gui.add(params, "draw_colors").name("Draw Colors").onChange(createAndRender);
  gui.add(params, "algorithm", params.algorithms).name("Algorithm").onChange(createAndRender);
}

function createAndRender() {
  rng = Alea(params.seed);
  create();
  render();
}

function create() {
  const algorithm = randomWalks[params.algorithm];
  const options = {
    min_step : params.min_step,
    max_step : params.max_step,
    mu       : params.mu,
    rng      : rng
  };

  points = algorithm(bbox, params.num_points, options);

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

  // Draw all the points
  noStroke();
  fill(point_colors[0].toHexString());
  points.forEach((point, i, points) => {

    if (params.draw_colors) {
      const position_percent = i / points.length;
      const point_color = lerpColors(position_percent, point_colors);
      fill(point_color.toHexString());
    }

    const ellipse_size = 5;
    ellipse(point[0], point[1], ellipse_size);
  });
}


function lerpColors(percent, colors) {
  const num_colors   = colors.length;
  const lower_color  = colors[floor(percent * num_colors)];
  const upper_color  = colors[Math.min(ceil(percent * num_colors), num_colors - 1)];

  const fill_percent = ( percent % (1 / num_colors) ) * num_colors;
  const final_color  = tinycolor.mix(lower_color, upper_color, fill_percent * 100);

  return final_color;
}
