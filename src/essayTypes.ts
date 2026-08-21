export interface Essay {
  id: string;
  title: string;
  body: string;
  authorName: string;
  email: string;
  isPrivate: boolean;
  createdAt: string;
}

export interface EssaySubmission {
  title: string;
  body: string;
  authorName: string;
  email: string;
  isPrivate: boolean;
}
