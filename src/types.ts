export interface UserProfile {
  skills: string[];
  interests: string[];
  equipment: string[];
  timeCommitment: string;
  experience: string;
  targetService: string;
  knowledgeGaps: string[];
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  actionType?: 'ai_chat' | 'content_studio' | 'proposal_builder' | 'masterhub_publish';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
  isDiagnostic?: boolean;
}

export interface MasterHubProject {
  id: string;
  title: string;
  category: string;
  creatorName: string;
  description: string;
  priceEstimate: string;
  tags: string[];
  contactInfo: string;
  publishedAt: string;
  status: string;
  viewCount?: number;
}

export type ActiveTab = 'home' | 'advisor' | 'studio' | 'canvas' | 'masterhub';
