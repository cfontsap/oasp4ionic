import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';


import { HeaderComponent } from './header/header';
import { SampledialogComponent } from './sampledialog/sampledialog';



@NgModule({
	declarations: [
    HeaderComponent,
    SampledialogComponent,
    ],
	imports: [],
	exports: [
    HeaderComponent,
    SampledialogComponent,
    ]
})
export class ComponentsModule {}
