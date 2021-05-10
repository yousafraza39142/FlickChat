import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {

	constructor(private _snackBar: MatSnackBar) {
	}

	openSnackBar(message: string, action: string): MatSnackBarRef<any> {
		return this._snackBar.open(message, action, {duration: 1000});
	}
}
