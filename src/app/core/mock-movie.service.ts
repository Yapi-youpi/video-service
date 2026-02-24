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
    description:
      'Когда засуха и пыльные бури вынуждают человечество искать новое пристанище, группа исследователей отправляется в путешествие через червоточину в космосе в поисках новой планеты для жизни. Режиссёр Кристофер Нолан совмещает научную фантастику с глубокой драмой о связи отца и дочери.',
    director: 'Кристофер Нолан',
    country: 'США, Великобритания',
  },
  {
    id: 2,
    title: 'Начало',
    year: 2010,
    genre: 'Фантастика, Триллер',
    rating: 8.7,
    duration: '2ч 28м',
    poster: 'https://ir.ozone.ru/s3/multimedia-y/c1000/6146123134.jpg',
    description:
      'Дом Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадёт ценные секреты из глубин подсознания во время сна. Ему могут вернуть прежнюю жизнь, если он выполнит невозможное задание — не украсть идею, а внедрить её. Успех даст шанс вернуться домой.',
    director: 'Кристофер Нолан',
    country: 'США, Великобритания',
  },
  {
    id: 3,
    title: 'Джокер',
    year: 2019,
    genre: 'Драма, Триллер',
    rating: 8.4,
    duration: '2ч 2м',
    poster: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/film/83/10270-1000x830.jpg',
    description:
      'Готэм-сити, начало 1980-х. Артур Флек живёт с больной матерью и зарабатывает клоуном. Мечтает стать стендап-комиком, но общество отвергает его. Постепенно он скатывается в безумие и насилие, превращаясь в культового злодея — Джокера.',
    director: 'Тодд Филлипс',
    country: 'США',
  },
  {
    id: 4,
    title: 'Дюна',
    year: 2021,
    genre: 'Фантастика, Приключения',
    rating: 8.1,
    duration: '2ч 35м',
    poster: 'https://cdn.ananasposter.ru/image/cache/catalog/poster/pos24/9/83809-1000x830.jpg',
    description:
      'Пол Атрейдес с семьёй отправляется на пустынную планету Арракис, где добывают ценнейшую пряность. Местные кланы и имперские интриги ставят под удар его жизнь. Пол должен принять свою судьбу и стать тем, кем ему предначертано быть.',
    director: 'Дени Вильнёв',
    country: 'США, Канада',
  },
  {
    id: 5,
    title: 'Бегущий по лезвию 2049',
    year: 2017,
    genre: 'Фантастика, Нео-нуар',
    rating: 8.0,
    duration: '2ч 44м',
    poster: 'https://ir.ozone.ru/s3/multimedia-g/c1000/6233515708.jpg',
    description:
      'Офицер Кей — новый охотник на беглых репликантов. Обнаружив тайну, способную погрузить общество в хаос, он отправляется на поиски Рика Декарда, бывшего детектива «бегущего по лезвию», пропавшего три десятилетия назад.',
    director: 'Дени Вильнёв',
    country: 'США, Великобритания, Венгрия',
  },
  {
    id: 6,
    title: 'Матрица',
    year: 1999,
    genre: 'Фантастика, Боевик',
    rating: 8.7,
    duration: '2ч 16м',
    poster: 'https://ir.ozone.ru/s3/multimedia-1-6/c1000/6945805950.jpg',
    description:
      'Хакер Нео узнаёт, что реальность — это симуляция под названием Матрица, созданная машинами. Повстанцы во главе с Морфеусом верят, что Нео — Избранный, способный положить конец войне между людьми и машинами.',
    director: 'Лана и Лилли Вачовски',
    country: 'США',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MockMovieService {
  getMovies(): Observable<ReadonlyArray<Movie>> {
    return of(MOCK_MOVIES).pipe(delay(300));
  }

  getMovieById(id: number): Observable<Movie | null> {
    return this.getMovies().pipe(
      map((movies) => movies.find((movie) => movie.id === id) ?? null),
    );
  }
}
