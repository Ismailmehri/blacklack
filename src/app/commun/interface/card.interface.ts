export interface ImagesInterface {
  svg: string;
  png: string;
}

export interface CardInterface {
  code: string;
  image: string;
  images: ImagesInterface;
  value: string;
  suit: string;
}
