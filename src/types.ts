export interface Quote {
  id: string;
  text: string;
  author: string;
  source: string;
  activeWeek?: string;
  status: 'active' | 'scheduled' | 'archived';
  commentary?: string;
  era?: 'Ancient' | 'Enlightenment' | '19th Century' | '20th Century' | 'Contemporary';
}

export type TopicCategory = 
  | 'Ethics & Moral Philosophy'
  | 'Metaphysics'
  | 'Epistemology'
  | 'Political Philosophy'
  | 'Existentialism & Meaning'
  | 'Aesthetics';

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: TopicCategory;
  resourceLink?: string;
  imageUrl?: string;
  isWide?: boolean;
  discussionQuestions?: string[];
  keyThinkers?: string[];
}

export interface ClubInfo {
  clubName: string;
  schoolName: string;
  tagline: string;
  classroom: string;
  frequency: string;
  scheduleDetail: string;
  groupmeUrl: string;
  presidentName: string;
  facultyAdvisor: string;
  contactEmail: string;
  heroImageUrl: string;
}

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  era: string;
  category: string;
  description: string;
  readTime: string;
  link?: string;
}
