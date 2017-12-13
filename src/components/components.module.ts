import { NgModule } from '@angular/core';
// import { LoginComponent } from './login/login.component';


import { HeaderComponent } from './header/header';
import { HeaderManagementProvider } from './header/HeaderManagement/HeaderManagement';


@NgModule({
	declarations: [
    HeaderComponent,
    ],
	imports: [HeaderManagementProvider],
	exports: [
    HeaderComponent,
    ]
})
export class ComponentsModule {}
