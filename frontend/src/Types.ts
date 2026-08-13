export interface Author{
    _id: string;
    name: string;
}
export interface Book {
  _id?: string;
  title: string;
  description: string;
  author: Author;
  cover: string;
  genre: string;
  createdAt?: string;

}
