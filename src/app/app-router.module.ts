import {
  RouterModule,
  Routes
} from '@angular/router';
import { NgModule } from '@angular/core';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { AddOrUpdateImageComponent } from './components/new-image/add-or-update-image.component';

const appRoutes: Routes = [
  {path: '', component: AllImagesComponent},
  {path: 'edit/:id', component: AddOrUpdateImageComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
})

export class AppRouterModule {
}
