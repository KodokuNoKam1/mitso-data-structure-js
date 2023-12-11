const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require('../extensions/list-tree.js');
// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree
{
    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode;
    }

  add(data) {
      const newNode = new Node(data);
      if (!this.rootNode) {
          this.rootNode = newNode;
          return;
      }
      let currentNode = this.rootNode;
      while (currentNode) {
          if (data < currentNode.data) {
              if (!currentNode.left) {
                  currentNode.left = newNode;
                  break;
              }
              currentNode = currentNode.left;
          } else {
              if (!currentNode.right) {
                  currentNode.right = newNode;
                  break;
              }
              currentNode = currentNode.right;
          }
      }
  }

  has(data) {
      return !!this.find(data);
  }

  find(data) {
      let currentNode = this.rootNode;
      while (currentNode) {
          if (data === currentNode.data) {
              return currentNode;
          } else if (data < currentNode.data) {
              currentNode = currentNode.left;
          } else {
              currentNode = currentNode.right;
          }
      }
      return null;
  }

  remove(data) {
      this.rootNode = this.removeNode(this.rootNode, data);
    }

    removeNode(node, data) {
        if (node === null) {
            return null;
        } else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            const minRightNode = this.findMinNode(node.right);
            node.data = minRightNode.data;
            node.right = this.removeNode(node.right, minRightNode.data);
            return node;
        }
    }

    findMinNode(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

  min() {
      let currentNode = this.rootNode;
      if (!currentNode) {
          return null;
      }
      while (currentNode.left !== null) {
          currentNode = currentNode.left;
      }
      return currentNode.data;
  }

  max() {
      let currentNode = this.rootNode;
      if (!currentNode) {
          return null;
      }
      while (currentNode.right !== null) {
          currentNode = currentNode.right;
      }
      return currentNode.data;
  }
  
};