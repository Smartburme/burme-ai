
export type Message = {
    role: 'user' | 'model';
    text: string;
    image?: string; // Data URL for display
};

export type ChatSession = {
  id: string;
  topic: string;
  messages: Message[];
  timestamp: number;
};

export type ProjectStructureNode = {
  name: string;
  type: 'folder' | 'file';
  path: string;
  description: string;
  children?: ProjectStructureNode[];
};