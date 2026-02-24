export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
  duration: string;
  /** Краткое или полное описание фильма */
  description: string;
  /** Режиссёр */
  director: string;
  /** Страна производства */
  country: string;
}
