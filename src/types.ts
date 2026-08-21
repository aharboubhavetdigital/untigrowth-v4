export interface TalentProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  aiScore: number;
  skills: { name: string; level: 'Expert' | 'Advanced' | 'Intermediate' }[];
  availability: 'Disponible maintenant' | 'Disponible sous 48h' | 'Disponible sous 3j' | 'Occupé';
  status: 'valid' | 'pending';
  hourlyRate?: string;
  experienceYears?: number;
  completedMissions?: number;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ExpertiseCategory {
  id: string;
  title: string;
  description: string;
  tags: string[];
  isHighlight?: boolean;
  isLarge?: boolean;
}

export interface KpiItem {
  label: string;
  title: string;
  description: string;
  stat?: string;
}
