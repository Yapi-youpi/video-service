import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../../shared/models/movie.model';
import { MovieCardComponent } from './movie-card.component';
import { MockMovieService } from '../../core/mock-movie.service';

function getLevenshteinDistance(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;

  if (lenA === 0) {
    return lenB;
  }
  if (lenB === 0) {
    return lenA;
  }

  const matrix: number[][] = [];

  for (let i = 0; i <= lenB; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= lenA; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= lenB; i++) {
    for (let j = 1; j <= lenA; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1, // deletion
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j - 1] + 1, // substitution
        );
      }
    }
  }

  return matrix[lenB][lenA];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MovieCardComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly movieService = inject(MockMovieService);
  private readonly cdr = inject(ChangeDetectorRef);

  movies: ReadonlyArray<Movie> = [];

  isLoading = true;

  searchTerm = '';

  get filteredMovies(): ReadonlyArray<Movie> {
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.movies;
    }

    // Сначала ищем точные совпадения
    const exactMatches = this.movies.filter((movie) => {
      const haystack = `${movie.title} ${movie.genre}`.toLowerCase();
      return haystack.includes(term);
    });

    // Если есть точные совпадения, возвращаем их
    if (exactMatches.length > 0) {
      return exactMatches;
    }

    // Если точных совпадений нет, ищем по расстоянию Левенштейна
    const maxDistance = term.length <= 6 ? 3 : Math.floor(term.length / 2);
    const moviesWithDistance = this.movies
      .map((movie) => {
        const title = movie.title.toLowerCase();
        const distance = getLevenshteinDistance(term, title);
        return { movie, distance };
      })
      .filter(({ distance }) => distance <= maxDistance && distance > 0)
      .sort((a, b) => a.distance - b.distance)
      .map(({ movie }) => movie);

    return moviesWithDistance;
  }

  get suggestedMovie(): Movie | null {
    const term = this.searchTerm.trim().toLowerCase();
    const filtered = this.filteredMovies;

    // Предложение показываем только если нет результатов вообще (ни точных, ни по Левенштейну)
    if (!term || filtered.length > 0) {
      return null;
    }

    // Если мы здесь, значит нет результатов даже по Левенштейну
    // Можно показать самое близкое предложение с более мягким порогом
    let bestMovie: Movie | null = null;
    let bestScore = Number.POSITIVE_INFINITY;

    for (const movie of this.movies) {
      const title = movie.title.toLowerCase();
      const distance = getLevenshteinDistance(term, title);

      if (distance < bestScore) {
        bestScore = distance;
        bestMovie = movie;
      }
    }

    // Более мягкий порог для предложения: до 5 символов разницы
    const maxDistance = 5;
    
    if (bestScore <= maxDistance && bestMovie && bestScore > 0) {
      return bestMovie;
    }
    
    return null;
  }

  onMovieSelected(movie: Movie): void {
    this.router.navigate(['/movie', movie.id]);
  }

  constructor() {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }
}

