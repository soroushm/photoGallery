export interface Album {
  albumId: string;
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type Albums = Album[];

export interface Comment {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

export type Comments = Comment[];
