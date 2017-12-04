import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';


import { HeaderComponent } from './header/header';
import { SearchComponent } from './search/search';
@NgModule({
	declarations: [
    HeaderComponent,
    SearchComponent],
	imports: [],
	exports: [
    HeaderComponent,
    SearchComponent]
})
export class ComponentsModule {}
