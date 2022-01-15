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
        style: {
            'width': 3,
            'curve-style': 'bezier',
            'line-color': '#ccc',
          // 변경된 부분
            'source-arrow-color': '#ccc',
            'source-arrow-shape': 'triangle'
          //
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
            'border-opacity': '50%',
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
            'border-opacity': '50%',
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
            'border-opacity': '50%',
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
            'border-opacity': '50%',
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
            'border-opacity': '50%',
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
            'background-color': 'white',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'brown',
            'border-opacity': '50%',
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