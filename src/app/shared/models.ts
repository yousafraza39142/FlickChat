export enum SideNavActions {
	CHATS,
	CONTACTS,
	SETTINGS,
}

export const AppBreakPoints = {
	xs: ( '(min-width: 786px)' ),
	md: ( '(min-width: 992px)' ),
	lg: ( '(min-width: 1024px)' ),
	xl: ( '(min-width: 1200px)' ),
};

export enum LogLevel {
	All = 0,
	Debug = 1,
	Info = 2,
	Warn = 3,
	Error = 4,
	Fatal = 5,
	Off = 6
}


export interface IUserModel {
	uid: string;
	displayName: string;
	email: string;
	status: string;
	phoneNumber?:string;
	photoURL: string;
}
