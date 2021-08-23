import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ImageUploadComponent } from './image-upload/image-upload.component';

const COMPONENTS = [
	ProfileImageComponent,
	ImageUploadComponent,
];

@NgModule( {
	declarations: [
		COMPONENTS
	],
	imports: [
		CommonModule,
		MaterialModule,
		LayoutModule
	],
	exports: [
		MaterialModule,
		LayoutModule,
		COMPONENTS,
	]
} )
export class SharedModule {
}
