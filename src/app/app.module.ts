import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HttpClient,HttpClientModule} from '@angular/common/http';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJmRYwAZDExTfhiuPORIETHOVeCCOBwjs",
  authDomain: "mail-e0aa1.firebaseapp.com",
  projectId: "mail-e0aa1",
  storageBucket: "mail-e0aa1.appspot.com",
  messagingSenderId: "645574094332",
  appId: "1:645574094332:web:c9ccad065e9b35c63dd679",
  measurementId: "G-GB8F0C18G3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AdminShowComponent } from './admin-show/admin-show.component';
import { UpdateComponent } from './update/update.component';
import { AdminchatComponent } from './Chat/adminchat/adminchat.component';
import { AddComponent } from './user/add/add.component';
import {MatCardModule} from '@angular/material/card';
import { ShowComponent } from './user/show/show.component';
import {MatChipsModule} from '@angular/material/chips';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminVisitorComponent } from './admin-visitor/admin-visitor.component';
import { FileUploadModule,FileSelectDirective} from 'ng2-file-upload';
import { dialogBox } from './admin-show/admin-show.component';
import {MatSelectModule} from '@angular/material/select';
import {MatBadgeModule} from '@angular/material/badge';
import { ShowAdminComponent } from './man/show-admin/show-admin.component';
import {MatTableModule} from '@angular/material/table';
import { ShowUserComponent } from './man/show-user/show-user.component';
import { AdminTriggerComponent } from './admin-trigger/admin-trigger.component';
import { TriggerComponent } from './user/trigger/trigger.component';
import {MatTreeModule} from '@angular/material/tree';
import { RoleComponent } from './man/role/role.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminAgentComponent } from './admin-agent/admin-agent.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { VerifyComponent } from './verify/verify.component';
import { ForgetComponent } from './forget/forget.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyAgentComponent } from './verify-agent/verify-agent.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminWidgetComponent } from './admin-widget/admin-widget.component';
import { AdmingraphComponent } from './admingraph/admingraph.component';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md';



export function tokenGetter() {
  return localStorage.getItem('email');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminShowComponent,
    UpdateComponent,
    AdminchatComponent,
    AddComponent,
    ShowComponent,
    AdminDashComponent,
    AdminVisitorComponent,
    dialogBox,
    ShowAdminComponent,
    ShowUserComponent,
    AdminTriggerComponent,
    TriggerComponent,
    RoleComponent,
    AdminRoleComponent,
    AdminAgentComponent,
    VerifyComponent,
    ForgetComponent,
    UpdatePassComponent,
    AdminProfileComponent,
    NotFoundComponent,
    VerifyAgentComponent,
    AdminHomeComponent,
    AdminWidgetComponent,
    AdmingraphComponent,
    
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    HttpClientModule,
    MatListModule,
    MatSidenavModule,
   MatIconModule,
   MatInputModule,
   MatMenuModule,
   MatButtonModule,
   MatDialogModule,
   MatFormFieldModule,MatInputModule,
  MatCardModule,
  MatChipsModule,
 FileUploadModule,
 MatSelectModule,
 MatBadgeModule,
 MatTreeModule,
MatTableModule,
ChartsModule,
WavesModule,  
ScrollingModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:[
          "localhost:4200"
        ]
      }
    })
    
    

  ],
  providers: [
   AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
