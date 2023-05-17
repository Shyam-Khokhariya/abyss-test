import React, { useState } from 'react'
import './Tree.css' // Import the CSS file for styling

interface Node {
  id: number
  name: string
  children: Node[]
}

const initialNode: Node = {
  id: 1,
  name: 'Base Node',
  children: []
}

const TreeNode: React.FC<{
  node: Node
  position: string
  rootNode: Node
  setRootNode: (node: Node) => void
}> = ({ node, position, rootNode, setRootNode }) => {
  const [editing, setEditing] = useState(true)
  const [nodeName, setNodeName] = useState(node.name)

  const handleAddNode = () => {
    const newNode: Node = {
      id: Date.now(),
      name: '',
      children: []
    }
    node.children.push(newNode)
    setNodeName('')
    setEditing(false)
    setRootNode(JSON.parse(JSON.stringify(rootNode)))
  }

  const handleEditNode = () => {
    setEditing(true)
  }

  const handleDeleteNode = () => {
    const deleteNode = (parentNode: Node, currentNode: Node) => {
      const index = parentNode.children.findIndex(child => child.id === currentNode.id)
      if (index !== -1) {
        parentNode.children.splice(index, 1)
      } else {
        parentNode.children.forEach(child => {
          deleteNode(child, currentNode)
        })
      }
    }

    deleteNode(rootNode, node)
    setRootNode(JSON.parse(JSON.stringify(rootNode)))
  }

  const handleSaveNode = () => {
    node.name = nodeName || 'Category'
    setEditing(false)
  }

  return (
    <div className="tree-node">
      <div className={position} />
      <div className="top-stright" />
      <div className="node-content">
        {editing ? (
          <div>
            <input
              type="text"
              className="node-input"
              placeholder="Category"
              value={nodeName}
              onChange={e => setNodeName(e.target.value)}
              autoFocus
            />
          </div>
        ) : (
          <div className="node-text">{node.name}</div>
        )}

        {editing ? (
          <button className="save-button" onClick={handleSaveNode}>
            <i className="fas fa-save" />
          </button>
        ) : (
          <div className="node-button">
            <button className="add-button" onClick={handleAddNode}>
              <i className="fas fa-plus" />
            </button>
            <button className="edit-button" onClick={handleEditNode}>
              <i className="fas fa-edit" />
            </button>
            <button className="delete-button" onClick={handleDeleteNode}>
              <i className="fas fa-trash" />
            </button>
          </div>
        )}
      </div>
      {node.children.length ? <div className="bottom-stright" /> : null}

      <div className="tree-children">
        {node.children.map((child, index) => {
          let position = ''
          const childs = node.children.length
          if (childs > 1) {
            if (index === 0) position = 'isLeft'
            else if (index === childs - 1) position = 'isRight'
            else position = 'isCenter'
          }
          return (
            <TreeNode
              key={child.id}
              position={position}
              node={child}
              rootNode={rootNode}
              setRootNode={setRootNode}
            />
          )
        })}
      </div>
    </div>
  )
}

const BaseNode: React.FC<{
  node: Node
  rootNode: Node
  setRootNode: (node: Node) => void
}> = ({ node, rootNode, setRootNode }) => {
  const handleAddNode = () => {
    const newNode: Node = {
      id: Date.now(),
      name: '',
      children: []
    }

    node.children.push(newNode)
    setRootNode(JSON.parse(JSON.stringify(rootNode)))
  }

  return (
    <div className="tree-node">
      <div className="node-content">
        <div className="base-text">{node.name}</div>
        <div className="base-node-button">
          <button className="add-button" onClick={handleAddNode}>
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      {node.children.length ? <div className="bottom-stright" /> : null}
      <div className="tree-children">
        {node.children.map((child, index) => {
          let position = ''
          const childs = node.children.length
          if (childs > 1) {
            if (index === 0) position = 'isLeft'
            else if (index === childs - 1) position = 'isRight'
            else position = 'isCenter'
          }
          return (
            <TreeNode
              key={child.id}
              position={position}
              node={child}
              rootNode={rootNode}
              setRootNode={setRootNode}
            />
          )
        })}
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [rootNode, setRootNode] = useState(initialNode)

  return (
    <div className="tree-container">
      <BaseNode node={rootNode} rootNode={rootNode} setRootNode={setRootNode} />
    </div>
  )
}

export default App
