export const MindmapStyle = [ // the stylesheet for the graph
    {
        selector: 'node',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': '#666',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)',
        }
    },

    {
        selector: 'edge',
        "style": {
          "curve-style": "taxi",
          "taxi-direction": "downward",
          "taxi-turn": 20,
          "taxi-turn-min-distance": 5
        }
    },

    // node types
    {
        selector: '.longterm',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'blue',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },
    {
        selector: '.shortterm',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'red',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },
    {
        selector: '.plan',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'skyblue',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },
    {
        selector: '.routine',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'yellow',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },
    {
      selector: '.todo',
      style: {
          'font-family': 'Ssurround',
          'font-size': '14px',
          'background-color': 'white',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'purple',
          "shape": "round-rectangle",
          "width": '100px',
          'label': 'data(label)'
      }
  },
    {
        selector: '.incomplete',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'green',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },
    {
        selector: '.isComplished',
        style: {
            'font-family': 'Ssurround',
            'font-size': '14px',
            'background-color': 'green',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'blue',
            "shape": "round-rectangle",
            "width": '100px',
            'label': 'data(label)'
        }
    },

    // edgehandles
    {
        selector: '.eh-handle',
        style: {
          'background-color': 'red',
          'width': 12,
          'height': 12,
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0
        }
      },

      {
        selector: '.eh-hover',
        style: {
          'background-color': 'red'
        }
      },

      {
        selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
      },

      {
        selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
      },
      {
        selector: '.eh-ghost-edge.eh-preview-active',
        style: {
          'opacity': 0
        }
      }
]