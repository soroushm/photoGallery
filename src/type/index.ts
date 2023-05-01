export interface Album {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type Albums = Album[];

export interface Comment {
  albumId: string;
  id: string;
  userId: string;
  name: string;
  body: string;
  date: string;
}

export type Comments = Comment[];
