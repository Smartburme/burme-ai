import React, { useState, useCallback } from 'react';
import { ProjectStructureNode } from '../types';
import { ChevronRightIcon, getIconForFile } from './icons';

interface FileTreeNodeProps {
  node: ProjectStructureNode;
  onSelectNode: (node: ProjectStructureNode) => void;
  selectedNodePath: string | null;
  level: number;
  expandedFolders: Record<string, boolean>;
  onToggleFolder: (path: string) => void;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onSelectNode, selectedNodePath, level, expandedFolders, onToggleFolder }) => {
  const isFolder = node.type === 'folder';
  const isExpanded = isFolder && expandedFolders[node.path];
  const isSelected = selectedNodePath === node.path;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      onToggleFolder(node.path);
    }
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectNode(node);
    if (isFolder && !isExpanded) {
        onToggleFolder(node.path);
    }
  };

  const Icon = getIconForFile(node.name, node.type);

  return (
    <div>
      <div
        onClick={handleSelect}
        className={`flex items-center py-2 px-2 rounded-md cursor-pointer transition-colors duration-150 group ${
          isSelected ? 'bg-gray-700 text-white font-medium' : 'text-gray-300 hover:bg-gray-700/50'
        }`}
        style={{ paddingLeft: `${level * 1.25}rem` }}
      >
        <div className="flex items-center w-full truncate">
            {isFolder && (
                <ChevronRightIcon
                    onClick={handleToggle}
                    className={`w-5 h-5 mr-1 text-gray-500 transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                />
            )}
            <Icon className={`w-5 h-5 mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-400'}`} style={{ marginLeft: isFolder ? '0' : '1.75rem' }} />
            <span className="truncate">{node.name}</span>
        </div>
      </div>
      {isFolder && isExpanded && node.children && (
        <div className="border-l border-gray-700" style={{ marginLeft: `${level * 1.25 + 1}rem` }}>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              onSelectNode={onSelectNode}
              selectedNodePath={selectedNodePath}
              level={level + 1}
              expandedFolders={expandedFolders}
              onToggleFolder={onToggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};


interface FileTreeProps {
  data: ProjectStructureNode;
  onSelectNode: (node: ProjectStructureNode) => void;
  selectedNodePath: string | null;
}

const FileTree: React.FC<FileTreeProps> = ({ data, onSelectNode, selectedNodePath }) => {
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({[data.path]: true});

    const handleToggleFolder = useCallback((path: string) => {
        setExpandedFolders(prev => ({...prev, [path]: !prev[path]}));
    }, []);

    return (
        <FileTreeNode 
            node={data} 
            onSelectNode={onSelectNode} 
            selectedNodePath={selectedNodePath}
            level={0}
            expandedFolders={expandedFolders}
            onToggleFolder={handleToggleFolder}
        />
    );
};

export default FileTree;
