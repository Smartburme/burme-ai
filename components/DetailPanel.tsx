import React from 'react';
import { ProjectStructureNode } from '../types';
import { getIconForFile, BurmeAiIcon } from './icons';
import { marked } from 'marked';

interface DetailPanelProps {
  node: ProjectStructureNode | null;
  aiExplanation: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center space-x-2 text-gray-400">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-fast"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-fast [animation-delay:0.2s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse-fast [animation-delay:0.4s]"></div>
    <span className="text-sm">Gemini is thinking...</span>
  </div>
);

const DetailPanel: React.FC<DetailPanelProps> = ({ node, aiExplanation, isLoading, error }) => {
  const parsedExplanation = aiExplanation ? marked.parse(aiExplanation) : '';

  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <BurmeAiIcon className="w-24 h-24 mb-6 rounded-full"/>
        <h2 className="text-2xl font-semibold text-gray-300">Welcome to Burme AI Explorer</h2>
        <p className="mt-2 max-w-md text-gray-400">Select a file or folder from the tree on the left to see its details and get an AI-powered explanation of its role in the project.</p>
      </div>
    );
  }

  const Icon = getIconForFile(node.name, node.type);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <div className="flex items-center mb-3">
          <Icon className={`w-8 h-8 mr-4 text-gray-400`} />
          <h2 className="text-3xl font-bold text-gray-100">{node.name}</h2>
        </div>
        <p className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded-md inline-block font-mono">{node.path}</p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg ring-1 ring-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2">Description</h3>
        <p className="text-gray-300 leading-relaxed">{node.description}</p>
      </div>
      
      <div className="bg-gray-800/50 p-6 rounded-lg ring-1 ring-gray-700/50">
        <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
            <h3 className="text-lg font-semibold text-gray-300 flex items-center">
                <BurmeAiIcon className="w-6 h-6 mr-2 rounded-full" />
                Gemini AI Explanation
            </h3>
            {isLoading && <LoadingIndicator />}
        </div>
        {error && !isLoading && <p className="text-red-400 bg-red-900/20 p-3 rounded-md">{error}</p>}
        <div 
          className="prose prose-sm prose-invert max-w-none prose-p:text-gray-300 prose-ul:text-gray-300 prose-li::marker:text-gray-500 prose-strong:text-gray-100 prose-headings:text-gray-200 text-gray-300 leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: parsedExplanation }}
        >
        </div>
        {isLoading && !aiExplanation && <div className="h-24"></div>}
      </div>
    </div>
  );
};

export default DetailPanel;