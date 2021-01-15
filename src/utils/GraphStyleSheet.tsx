module.exports = (function()
{
  var styleSheet = [
    {
      selector: 'node',
      style:
      {
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#1e2829',
        'width': function (ele)
        {
          return nodeWFunc(ele);
        },
        'height': function (ele)
        {
          return nodeHFunc(ele);
        },
        // 'background-image-opacity': 1,
        // 'background-image': function (ele)
        // {
        //   return backgroundImageHandler(ele);
        // },
        'background-color': 'white',
        'shape': function(ele)
        {
          return parentNodeShapeFunc( ele );
        },
        'border-width': function(ele)
        {
          return borderWidthFunction( ele );
        },
        'border-color': function(ele)
        {
          return nodeBorderColorFunction(ele);
        },
        'font-size': 14
      }
    },
    {
      selector: 'node[name]',
      style: {
        'label': 'data(name)'
      }
    },
    {
      selector: 'node:parent',
      style:
      {
        'shape': function(ele)
        {
          return parentNodeShapeFunc( ele );
        },
        'text-valign': function(ele)
        {
          return 'bottom';
        },
        'text-margin-y' : 2,
        'padding-left': function(ele){ return compoundPaddingFunction(ele); },
        'padding-right': function(ele){ return compoundPaddingFunction(ele); },
        'padding-bottom': function(ele){ return compoundPaddingFunction(ele); },
        'padding-top':  function(ele){ return compoundPaddingFunction(ele); },
        'background-opacity': 0.5,
        'border-width': function(ele)
        {
          return parentBorderWidthFunction( ele );
        },
        'border-color': function(ele)
        {
          return nodeBorderColorFunction(ele);
        },
        'background-color': function(ele){
          return nodeBackgroundColorFunction(ele);
        }
      }
    },
    {
      selector: 'edge',
      style:
      {
        'arrow-scale': 1.7,
        'curve-style': 'bezier',
        'text-background-color': '#EEEEEE',
        'text-background-opacity': 0,
        'target-arrow-shape': function( ele )
        {
          return edgeTargetArrowTypeHandler(ele);
        },
        'width': 1,
        'line-color': function( ele )
        {
          return edgeColorHandler(ele);
        },
        'target-arrow-color': function( ele )
        {
          return edgeColorHandler(ele);
        },
        'line-style': function(ele)
        {
          return edgeLineTypeHandler(ele);
        },
        'opacity': 1,

      }
    },
    {
      selector: 'edge[name]',
      style: {
        'label': 'data(name)'
      }
    },
    // {
    //     selector: 'edge.segments',
    //     style:
    //     {
    //       'curve-style': 'segments',
    //       'segment-distances': '0 100',
    //       'segment-weights': '0 1'
    //     }
    // },



    // some style for the Edge Handles !!!

    {
      selector: '.eh-handle',
      style: {
        'background-color': '#1abc9c',
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
      css: {
        'background-color': '#1abc9c'
      }
    },

    {
      selector: '.eh-source',
      css: {
        'border-width': 2,
        'border-color': '#1abc9c'
      }
    },

    {
      selector: '.eh-target',
      css: {
        'border-width': 2,
        'background-color': '#1abc9c',
        'border-color': '#1abc9c'
      }
    },

    {
      selector: '.eh-preview, .eh-ghost-edge',
      css: {
        'line-color': '#1abc9c',
        'target-arrow-color': '#1abc9c',
        'source-arrow-color': '#1abc9c'
      }
    },

    {
      selector: '.highlightedEdge',
      style:
          {
              'width': 3.5,
              'border-width':4,
              'line-color' : '#1abc9c' ,
              'target-arrow-color': '#1abc9c',
              'arrow-scale': 2
          }
    },
    {
      selector: '.highlightedNode',
      style:
      {
          'border-width': function(ele)
          {
              return highlightedBorderWidthFunction( ele );
          },
          'border-color': '#1abc9c',
          'background-color': '#fff',
          // 'shadow-color' : '#1abc9c',
          // 'background-opacity': 0.5,
          // 'shadow-opacity': 1.0
      }
    },
    {
      selector: '.invalidGene',
      style:
      {
          'border-width': 2,
          'border-color': '#e94332',
          'color': '#e94332'
      }
    },
    {
      // The css properties when a node is highlighted and an invalid gene
      selector: '.invalidGeneHighlight',
      style:
      {
          'border-width': 3,
          'font-weight' : 'bold',
          // 'shadow-color' : '#e94332',
          // 'background-color': '#e94332',
          'border-color': '#e94332',
          'color': '#e94332',
          // 'shadow-opacity': 1.0,
      }
    },
    {
        selector: 'node:selected',
        style:
            {
                'border-width': function(ele)
                {
                    return selectedBorderWidthFunction( ele );
                },
                'border-color' : '#ffc90e', /*#f1c40f'*/
            }
    },
    {
        selector: '.highlightedNode:selected, .invalidGeneHighlight:selected',
        style:
            {
                'border-width': function(ele)
                {
                    return selectedHighlightedBorderWidthFunction( ele );
                },
            }
    },
    {
        selector: 'edge:selected',
        style:
            {
                'width' : 3,
                'line-color' : '#ffc90e',
                'target-arrow-color': '#ffc90e'
            }
    },
  ];



  var compoundPaddingFunction = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "FAMILY": return 5; break;
      case "COMPLEX": return '5'; break;
      case "COMPARTMENT": return 10; break;
      case "PROCESS": return 10; break;
      default: return 5; break;
    }
  };

  var contentFunction = function( ele )
  {
    if (ele._private.data.name) {
      return ele._private.data.name;
    }
    return 'newNode';
  };

  var vTextPositionFunction = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "GENE": return 'center'; break;
      case "FAMILY": return 'top'; break;
      case "COMPLEX": return 'top'; break;
      case "COMPARTMENT": return 'top'; break;
      default: return 'center'; break;
    }
  };

  var borderWidthFunction = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "GENE": return 1; break;
      case "PROCESS": return 0; break;
      case "FAMILY": return 2; break;
      case "COMPARTMENT": return 4; break;
      default: return 1; break;
    }
  };

  var parentBorderWidthFunction = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "GENE": return 1; break;
      case "PROCESS": return 0; break;
      case "FAMILY": return 2; break;
      case "COMPLEX": return 1; break;
      case "COMPARTMENT": return 4; break;
      default: return 1; break;
    }
  };

  var highlightedBorderWidthFunction = function( ele )
  {
      switch (ele._private.data['type'])
      {
          case "GENE": return 3; break;
          case "PROCESS": return 0; break;
          case "FAMILY": return 4; break;
          case "COMPARTMENT": return 6; break;
          default: return 3; break;
      }
  };

    var selectedBorderWidthFunction = function( ele )
    {
        switch (ele._private.data['type'])
        {
            case "GENE": return 2; break;
            case "PROCESS": return 0; break;
            case "FAMILY": return 3; break;
            case "COMPARTMENT": return 5; break;
            default: return 2; break;
        }
    };
    var selectedHighlightedBorderWidthFunction = function( ele )
    {
        switch (ele._private.data['type'])
        {
            case "GENE": return 3; break;
            case "PROCESS": return 0; break;
            case "FAMILY": return 4; break;
            case "COMPARTMENT": return 6; break;
            default: return 3; break;
        }
    };


  var parentNodeShapeFunc = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "GENE": return "roundrectangle"; break;
      case "PROCESS": return "roundrectangle"; break;
      case "FAMILY": return "rectangle"; break;
      case "COMPARTMENT": return "roundrectangle"; break;
      case "COMPLEX": return "rectangle"; break;
      default: return "roundrectangle"; break;
    }
  };

  var nodeBackgroundColorFunction = function( ele )
  {
    // switch (ele._private.data['type'])
    // {
    //   case "GENE": return "#fff"; break;
    //   case "FAMILY": return "#CCCCCC"; break;
    //   case "COMPARTMENT": return "#fff"; break;
    //   default: return "#fff"; break;
    // }
    return "#fff";
  };

  var nodeBorderColorFunction = function( ele )
  {
    switch (ele._private.data['type'])
    {
      case "GENE": return "#00000a"; break;
      case "FAMILY": return "#a3a3a3"; break;
      case "COMPLEX": return "#000000"; break;
      case "COMPARTMENT": return "#000000"; break;
      default: return "#000000"; break;
    }
  };

  var edgeColorHandler = function( ele )
  {
    // switch (ele._private.data['type']){
    //   case "ACTIVATES": return "#904930"; break;
    //   case "INHIBITS": return "#7B7EF7"; break;
    //   case "INDUCES": return "#ad47c2"; break;
    //   case "REPRESSES": return "#67C1A9"; break;
    //   case "BINDS": return "#67C1A9"; break;
    //   default: return "#989898"; break;
    // }
    return "#1b1b1b";
  };

  var edgeTargetArrowTypeHandler = function( ele )
  {
    switch (ele._private.data['type']){
      case "ACTIVATES": return "triangle"; break;
      case "INHIBITS": return "tee"; break;
      case "INDUCES": return "triangle"; break;
      case "REPRESSES": return "tee"; break;
      case "BINDS": return "none"; break;
      default: return "none"; break;
    }
  };

  var edgeLineTypeHandler = function( ele )
  {
    switch (ele._private.data['type']){
      case "ACTIVATES": return "solid"; break;
      case "INHIBITS": return "solid"; break;
      case "INDUCES": return "dashed"; break;
      case "REPRESSES": return "dashed"; break;
      case "BINDS": return "solid"; break;
      default: return "solid"; break;
    }
  };

  var nodeWFunc = function( ele )
  {
    if (ele._private.data['w'])
    {
      return ele._private.data['w'];
    }
    else
      return 0;
  };

  var nodeHFunc = function( ele )
  {
      if (ele._private.data['h'])
      {
          return ele._private.data['h'];
      }
      else
          return 0;
  };

  return styleSheet;
})();
