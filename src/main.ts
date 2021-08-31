import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { CometChat } from '@cometchat-pro/chat';

if ( environment.production ) {
	enableProdMode();
}

const appSetting = new CometChat.AppSettingsBuilder()
	.subscribePresenceForAllUsers()
	.setRegion( environment.cometConfig.region )
	.build();

CometChat.init( environment.cometConfig.appId, appSetting ).then( () => {
		console.log( 'Chat Server Initialized' );
		// You can now call login function.
		platformBrowserDynamic()
			.bootstrapModule( AppModule )
			.catch( ( err ) => console.error( err ) );
	},
	( error ) => {
		console.log( 'Initialization failed with error:', error );
		// Check the reason for error and take appropriate action.
	}
);
