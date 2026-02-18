import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

  movie: Movie | null = null;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (Number.isFinite(id)) {
      this.movieService.getMovieById(id).subscribe((movie) => {
        this.movie = movie;
      });
    }
  }
}
