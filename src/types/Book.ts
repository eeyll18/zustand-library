export interface Book {
  id: string;
  title: string;
  author: string;
  isBorrowed: boolean;
  borrowByUserId?: string ;
  borrowDate?: string;
}
