import {Routes} from '@angular/router';
import {HomePage} from './features/home-page/home-page';
import {UserProfile} from './features/user-profile/user-profile';
import {MovieDetails} from './features/movie-details/movie-details';
import {SearchDetails} from './features/search-details/search-details';
import {Settings} from './features/settings/settings';
import {MyCollection} from './features/my-collection/my-collection';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'profile', component: UserProfile },
  { path: 'movie/:id', component: MovieDetails },
  { path: 'search', component: SearchDetails },
  { path: 'settings', component: Settings },
  { path: 'my-collection', component: MyCollection },
];
