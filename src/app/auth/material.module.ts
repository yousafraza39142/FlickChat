import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

const MODULES = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
];

@NgModule({
    declarations: [],
    exports: [...MODULES],
    imports: [...MODULES]
})
export class MaterialModule { }
