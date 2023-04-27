export interface IMovie {
  id: string;
  name: string;
  year: number;
  type: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  starring: string;
  similarity: number;
}
