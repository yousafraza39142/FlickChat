import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Subscription } from 'rxjs';

@Component( {
	selector: 'app-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: [ './image-upload.component.scss' ]
} )
export class ImageUploadComponent implements OnChanges, OnDestroy {

	@ViewChild( 'filePicker' ) filePicker;

	@Input() width    = 100;
	@Input() height   = 100;
	@Input() imageUrl = ``;
	@Input() disabled = false;

	@Output() eventUploadTask = new EventEmitter<AngularFireUploadTask>();
	@Output() eventPhotoUrl = new EventEmitter<string>();

	fReader = new FileReader();
	overrides = {};


	// Subs
	private subs = new Subscription();


	constructor( private userService: UserService ) {
	}


	ngOnChanges( changes: SimpleChanges ): void {
		this.buildStyles();
	}


	onFileUpload( file: File ) {
		const uploadTaskGenerator = this.userService.uploadImage( file );

		const fileRef: AngularFireStorageReference = uploadTaskGenerator.next().value;
		const uploadTask: AngularFireUploadTask = uploadTaskGenerator.next().value;

		this.subs.add(
			uploadTask.percentageChanges().subscribe( {
				complete: () => {
					fileRef.getDownloadURL().subscribe( url => {
						this.imageUrl = url;
						this.eventPhotoUrl.emit( url );
					} );
					this.buildStyles();
				}
			} )
		);

		this.eventUploadTask.emit( uploadTask );
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}


	private buildStyles() {
		this.overrides = {
			width: this.width + 'px',
			height: this.height + 'px',
			'background-image': `url('${ this.imageUrl }')`,
		};
	}
}
