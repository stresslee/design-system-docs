const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('figma-data.json', 'utf8'));

  let buttonSetNode = null;
  function findNode(node) {
    if (node.type === 'COMPONENT_SET' && node.name === 'Buttons/Button') {
      buttonSetNode = node;
      return;
    }
    if (node.children) {
      for (const child of node.children) {
        findNode(child);
        if (buttonSetNode) return;
      }
    }
  }

  if (data && data.document) {
    findNode(data.document);
  }

  if (buttonSetNode) {
    console.log('Found Buttons/Button node:', buttonSetNode.id);
    console.log('Component Properties:', JSON.stringify(buttonSetNode.componentPropertyDefinitions, null, 2));
  } else {
    // If we can't find it in document children, maybe depth=2 didn't reach it.
    console.log('Buttons/Button component set not found in the depth=2 document tree.');
  }

} catch (err) {
  console.error(err);
}
