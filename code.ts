figma.showUI(__html__, { width: 700, height: 500 })

let firstNode: SceneNode | null = null;
let secondNode: SceneNode | null = null;

// Function to compare nodes
function compareNodes() {
  const node1 = firstNode ? extractProperties(firstNode) : null;
  const node2 = secondNode ? extractProperties(secondNode) : null;
  figma.ui.postMessage({ type: 'comparison-result', node1, node2 });
}


function extractProperties(node:any) {
 
 let properties= {
    id: node.id,

    name: node.name,
    type: node.type,
    visible: node.visible,
    locked: node.locked,
    opacity:node.opacity,
    blendMode: node.blendMode,
    isMask: node.isMask,
    

       // Add more properties as needed
  };
 
  return properties
}

// Event listener for selection changes
figma.on('selectionchange', () => {
  const nodes = figma.currentPage.selection;
  const newFirstNode = nodes.length > 0 ? nodes[0] : null;
  const newSecondNode = nodes.length > 1 ? nodes[1] : null;
  if(firstNode!=null){
    secondNode=newFirstNode;
    compareNodes();
    console.log("hello") ;
  }
  else if (newFirstNode !== firstNode || newSecondNode !== secondNode) {
    firstNode = newFirstNode;
    secondNode = newSecondNode;
    compareNodes();
  }
});

// Compare nodes when the plugin is run
compareNodes();
