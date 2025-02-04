export default interface BookInterface {
  ISBN: string,
  author: string,
  brief: string,
  category: string,
  price: number,
  version: string,
  title: string,
  pages: number,
  timeToRead: string,
  date: string,
  [key: string]: string | number
}
