import React, { useState } from "react";

interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

interface RecursiveTreeProps {
  data: TreeNode[];
  addNode: (parentNode: TreeNode | null, nodeName: string) => void;
}

const RecursiveTree: React.FC<RecursiveTreeProps> = ({ data, addNode }) => {
  const [nodeName, setNodeName] = useState("");
  const [childNames, setChildNames] = useState<{ [key: number]: string }>({});

  const handleAddNode = (parentNode: TreeNode | null) => {
    if (nodeName) {
      addNode(parentNode, nodeName);
      setNodeName("");
    }
  };

  const handleAddChildNode = (parentNode: TreeNode) => {
    const name = childNames[parentNode.id];
    if (name) {
      addNode(parentNode, name);
      setChildNames((prev) => ({ ...prev, [parentNode.id]: "" }));
    }
  };

  const renderTree = (node: TreeNode) => (
    <div key={node.id} className="ml-8 mt-2">
      <span>{node.name}</span>
      <span className="list-none">
        {node.children && (
          <ul className="list-none">
            {node.children.map((child) => renderTree(child))}
          </ul>
        )}
      </span>
      <input
        type="text"
        value={childNames[node.id] || ""}
        onChange={(e) =>
          setChildNames((prev) => ({ ...prev, [node.id]: e.target.value }))
        }
        placeholder="New child name"
        className="mt-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={() => handleAddChildNode(node)}
        className="ml-2 p-1 bg-green-500 text-white rounded"
      >
        Add Child
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Recursive Tree</h2>
      <ul className="list-none">{data.map((node) => renderTree(node))}</ul>
      <input
        type="text"
        value={nodeName}
        onChange={(e) => setNodeName(e.target.value)}
        placeholder="New node name"
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={() => handleAddNode(null)}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Add Root Node
      </button>
    </div>
  );
};

export default RecursiveTree;

