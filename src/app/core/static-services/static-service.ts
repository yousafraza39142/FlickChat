import { Injectable } from '@angular/core';
import { IUserModel } from '../../shared/models';
import firebase from 'firebase';
import User = firebase.User;

@Injectable( {
	providedIn: 'root',
} )
export class StaticService {

	constructor() {
	}


	public static getIUserModel( { uid, email, photoURL, displayName, phoneNumber }: User ): IUserModel {
		return {
			uid,
			displayName,
			email,
			phoneNumber,
			photoURL,
			status: 'Hey! there I\'m using Flick Chat'
		};
	}
}
