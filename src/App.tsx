import React, { useState } from "react";
import RecursiveTree from "./components/RecursiveTree";
import IterativeTree from "./components/IterativeTree";

interface TreeNode {
  id: number;
  name: string;
  children: TreeNode[];
}

const initialData: TreeNode[] = [
  {
    id: 1,
    name: "Root 1",
    children: [
      {
        id: 2,
        name: "Child 1.1",
        children: [],
      },
      {
        id: 3,
        name: "Child 1.2",
        children: [
          {
            id: 4,
            name: "Child 1.2.1",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Root 2",
    children: [],
  },
];

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);

  const addNode = (parentNode: TreeNode | null, nodeName: string) => {
    const newNode: TreeNode = {
      id: Date.now(),
      name: nodeName,
      children: [],
    };

    if (parentNode === null) {
      setTreeData([...treeData, newNode]);
    } else {
      const addNodeToParent = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map((node) => {
          if (node.id === parentNode.id) {
            return { ...node, children: [...node.children, newNode] };
          }
          return { ...node, children: addNodeToParent(node.children) };
        });
      };
      setTreeData(addNodeToParent(treeData));
    }
  };

  return (
    <div className="flex justify-center gap-40 p-20">
      <RecursiveTree data={treeData} addNode={addNode} />
      <IterativeTree data={treeData} addNode={addNode} />
    </div>
  );
};

export default App;

