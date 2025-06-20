export type TJobItem = {
  id: number;
  title: string;
  badgeLetters: string;
  company: string;
  relevanceScore: number;
  daysAgo: number;
};

export type TJobItemContent = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
