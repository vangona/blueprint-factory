export const MindmapLayout = {
  name: "dagre",
  rankDir: "TB",
  minLen: (edge) => {
    return 3;
  },
  edgeWeight(edge) {
    return 1;
  }, // higher weight edges are generally made shorter and straighter than lower weight edges

  randomize: false,
  // general layout options
  fit: true, // whether to fit to viewport
  padding: 30, // fit padding
  spacingFactor: 0.7, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
  animate: false, // whether to transition the node positions
  animateFilter(node, i) {
    return true;
  }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: "ease-in", // easing of animation if enabled
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  transform(node, pos) {
    return pos;
  }, // a function that applies a transform to the final node position
  ready() {}, // on layoutready
  stop() {}, // on layoutstop
};
