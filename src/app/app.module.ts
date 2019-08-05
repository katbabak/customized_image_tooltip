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
import { KatTooltipModule } from './directives/kat-tooltip.module';
import { AddPlusButtonComponent } from './components/add-plus-button/add-plus-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllImagesComponent,
    ImageItemComponent,
    AddPlusButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRouterModule,
    HttpClientModule,
    MaterialModule,
    KatTooltipModule
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
