import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AllImagesComponent } from './components/all-images/all-images.component';
import { AppRouterModule } from './app-router.module';
import { ImageService } from './services/image.service';
import { OcFileStorageService } from './services/base64.service';
import {
  HttpClientModule
} from '@angular/common/http';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllImagesComponent,
    ImageItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRouterModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    ImageService,
    OcFileStorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
