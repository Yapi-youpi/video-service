import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';
import { MockMovieService } from '../../core/mock-movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MockMovieService);

  movie = signal<Movie | null>(null);
  isLoading = signal(true);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (Number.isFinite(id)) {
      this.movieService.getMovieById(id).pipe(
        finalize(() => this.isLoading.set(false)),
      ).subscribe((movie) => this.movie.set(movie));
    } else {
      this.isLoading.set(false);
    }
  }
}
