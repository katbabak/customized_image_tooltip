import {
  RouterModule,
  Routes
} from '@angular/router';
import { NgModule } from '@angular/core';
import { AllImagesComponent } from './components/all-images/all-images.component';

const appRoutes: Routes = [
  {path: '', component: AllImagesComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // <-- debugging purposes only
    )
    // other imports here
  ],
})

export class AppRouterModule {
}
