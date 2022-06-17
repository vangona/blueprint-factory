    // 함수 변수 선언

    // edge, arrow
    const edgeWidth = "2px";

    // 색상
    const nodeTextColor = "black";
    const nodeColor = "white";

    const longtermColor = "red";
    const shorttermColor = "blue";
    const planColor = "skyblue";
    const routineColor = "purple";
    const todoColor = "yellow";
    const privateColor = "black";
    const incompleteColor = "lightgreen";
    const complishedColor = "green";

const cyStyle = [
  // the stylesheet for the graph
  {
    selector: "node",
    style: {
      color: nodeTextColor,
      "background-color": nodeColor,
      "text-halign": "center",
      "font-family": "SsurroundAir",
      "border-width": "1px",
      "border-style": "solid",
      label: "data(label)",
      // 'font-size': (ele) => {
      //   const fontSize = `${fontMaxSize * pageRank.rank('#' + ele.id()) + fontMinSize}px`;
      //   return fontSize;
      // },
    },
  },

  {
    selector: "edge",
    style: {
      width: edgeWidth,
      "curve-style": "taxi",
      "taxi-direction": "downward",
      "line-color": "#ccc",
      "source-arrow-color": "#ccc",
      "source-arrow-shape": "vee",
    },
  },

  // node types
  {
    selector: ".longterm",
    style: {
      "border-color": longtermColor,
      "background-color": longtermColor,
      // 'label': 'data(label)'
    },
  },
  {
    selector: ".shortterm",
    style: {
      "border-color": shorttermColor,
      "background-color": shorttermColor,
      shape: "round-octagon",
      // 'label': 'data(label)'
    },
  },
  {
    selector: ".plan",
    style: {
      "border-color": planColor,
      "background-color": planColor,
      shape: "round-hexagon",
      // 'label': 'data(label)'
    },
  },
  {
    selector: ".routine",
    style: {
      "border-color": routineColor,
      "background-color": routineColor,
      shape: "round-diamond",
      // 'label': 'data(label)'
    },
  },
  {
    selector: ".todo",
    style: {
      "border-color": todoColor,
      "background-color": todoColor,
      shape: "round-rectangle",
    },
  },
  {
    selector: ".incomplete",
    style: {
      "border-color": incompleteColor,
      shape: "round-tag",
      // 'label': 'data(label)'
    },
  },
  {
    selector: ".isPrivate",
    style: {
      "border-color": privateColor,
      "background-color": privateColor,
      shape: "round-rectangle",
      // 'label': '(비공개)'
    },
  },
  {
    selector: ".isComplished",
    style: {
      "border-color": complishedColor,
      "background-color": complishedColor,
      // 'label': '(비공개)'
    },
  },

  // edgehandles
  {
    selector: ".eh-handle",
    style: {
      "background-color": "red",
      width: 12,
      height: 12,
      shape: "ellipse",
      "overlay-opacity": 0,
      "border-width": 12, // makes the handle easier to hit
      "border-opacity": 0,
    },
  },

  {
    selector: ".eh-hover",
    style: {
      "background-color": "red",
    },
  },

  {
    selector: ".eh-source",
    style: {
      "border-width": 2,
      "border-color": "red",
    },
  },

  {
    selector: ".eh-target",
    style: {
      "border-width": 2,
      "border-color": "red",
    },
  },

  {
    selector: ".eh-preview, .eh-ghost-edge",
    style: {
      "background-color": "red",
      "line-color": "red",
      "target-arrow-color": "red",
      "source-arrow-color": "red",
    },
  },
  {
    selector: ".eh-ghost-edge.eh-preview-active",
    style: {
      opacity: 0,
    },
  },
];

export default cyStyle;