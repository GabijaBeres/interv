import React, { useState } from "react";

interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

interface IterativeTreeProps {
  data: TreeNode[];
  addNode: (parentNode: TreeNode | null, nodeName: string) => void;
}

const IterativeTree: React.FC<IterativeTreeProps> = ({ data, addNode }) => {
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

  const renderTreeIteratively = (nodes: TreeNode[]) => {
    const stack: { node: TreeNode; level: number }[] = nodes.map((node) => ({
      node,
      level: 0,
    }));
    const result: JSX.Element[] = [];

    while (stack.length > 0) {
      const { node, level } = stack.pop()!;
      result.push(
        <div
          key={node.id}
          className="pl-10"
          style={{ paddingLeft: level * 40 }}
        >
          <p>{node.name}</p>
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

      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({ node: node.children[i], level: level + 1 });
      }
    }

    return result;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Iterative Tree</h2>
      <div>{renderTreeIteratively(data)}</div>
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

export default IterativeTree;

