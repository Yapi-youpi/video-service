import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Movie } from '../shared/models/movie.model';

const MOCK_MOVIES: ReadonlyArray<Movie> = [
  {
    id: 1,
    title: 'Интерстеллар',
    year: 2014,
    genre: 'Фантастика, Драма',
    rating: 8.6,
    duration: '2ч 49м',
    poster: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/film/81/16064-1000x830.jpg',
  },
  {
    id: 2,
    title: 'Начало',
    year: 2010,
    genre: 'Фантастика, Триллер',
    rating: 8.7,
    duration: '2ч 28м',
    poster: 'https://ir.ozone.ru/s3/multimedia-y/c1000/6146123134.jpg',
  },
  {
    id: 3,
    title: 'Джокер',
    year: 2019,
    genre: 'Драма, Триллер',
    rating: 8.4,
    duration: '2ч 2м',
    poster: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/film/83/10270-1000x830.jpg',
  },
  {
    id: 4,
    title: 'Дюна',
    year: 2021,
    genre: 'Фантастика, Приключения',
    rating: 8.1,
    duration: '2ч 35м',
    poster: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/pos24/9/83809-1000x830.jpg',
  },
  {
    id: 5,
    title: 'Бегущий по лезвию 2049',
    year: 2017,
    genre: 'Фантастика, Нео-нуар',
    rating: 8.0,
    duration: '2ч 44м',
    poster: 'https://ir.ozone.ru/s3/multimedia-g/c1000/6233515708.jpg',
  },
  {
    id: 6,
    title: 'Матрица',
    year: 1999,
    genre: 'Фантастика, Боевик',
    rating: 8.7,
    duration: '2ч 16м',
    poster: 'https://ir.ozone.ru/s3/multimedia-1-6/c1000/6945805950.jpg',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MockMovieService {
  getMovies(): Observable<ReadonlyArray<Movie>> {
    // имитация сетевого запроса
    return of(MOCK_MOVIES).pipe(delay(300));
  }

  getMovieById(id: number): Observable<Movie | null> {
    return this.getMovies().pipe(
      map((movies) => movies.find((movie) => movie.id === id) ?? null),
    );
  }
}

