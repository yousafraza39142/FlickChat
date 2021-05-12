import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UtilitiesService {


	constructor(private _snackBar: MatSnackBar) {
	}

	openSnackBar(message: string, action: string = null): MatSnackBarRef<any> {
		return this._snackBar.open(message, action, {duration: 1000});
	}

	catchErrorLog(r: any) : Observable<boolean> {
			// TODO: Replace with own logger service in future
			console.error('AUTH-GUARD', r);
			return of(false);
	}
}
