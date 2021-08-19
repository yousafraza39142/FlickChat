import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';

const MODULES = [
	MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatCheckboxModule,
	MatToolbarModule,
	MatIconModule,
	MatSnackBarModule,
	MatMenuModule,
	MatSidenavModule,
	MatProgressBarModule,
	MatTooltipModule,
	MatBadgeModule,

];

@NgModule({
	declarations: [],
	exports: [...MODULES],
	imports: [...MODULES]
})
export class MaterialModule {
}
