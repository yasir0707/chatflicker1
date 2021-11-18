import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAgentComponent } from './admin-agent/admin-agent.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminRoleComponent } from './admin-role/admin-role.component';
import { AdminShowComponent } from './admin-show/admin-show.component';
import { AdminTriggerComponent } from './admin-trigger/admin-trigger.component';
import { AdminVisitorComponent } from './admin-visitor/admin-visitor.component';
import { AdminWidgetComponent } from './admin-widget/admin-widget.component';
import { AdmingraphComponent } from './admingraph/admingraph.component';
import { AppComponent } from './app.component';
import { AdminchatComponent } from './Chat/adminchat/adminchat.component';
import { ForgetComponent } from './forget/forget.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RoleComponent } from './man/role/role.component';
import { ShowAdminComponent } from './man/show-admin/show-admin.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth.guard';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './user/add/add.component';
import { ShowComponent } from './user/show/show.component';
import { TriggerComponent } from './user/trigger/trigger.component';
import { VerifyAgentComponent } from './verify-agent/verify-agent.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent },
  {path:'login',component:LoginComponent },
  {path:'update',component:UpdateComponent },
  {path:'forget',component:ForgetComponent},
  {path:'updatepass',component:UpdatePassComponent },
  {path:'verifyAgent/:token',component:VerifyAgentComponent },
  {path:'chat/:token',component:AddComponent },

  // {path:'adminchat',component:AdminchatComponent},
  {path:'admin',component:AdminDashComponent,canActivate:[AuthGuard],children:[
    {path:'adminuser',component:AdminShowComponent,canActivate:[AuthGuard]},
    {path:'visitor',component:AdminVisitorComponent,canActivate:[AuthGuard]},
  {path:'trigger',component:AdminTriggerComponent,canActivate:[AuthGuard]},
  {path:'role',component:AdminRoleComponent,canActivate:[AuthGuard]},
  {path:'agent',component:AdminAgentComponent,canActivate:[AuthGuard]},
  {path:'profile',component:AdminProfileComponent,canActivate:[AuthGuard]},
  {path:'home',component:AdminHomeComponent,canActivate:[AuthGuard]},
  {path:'graph',component:AdmingraphComponent,canActivate:[AuthGuard]},  

  {path:'widget',component:AdminWidgetComponent,canActivate:[AuthGuard]},  
]},

  {path:'home',component:HomeComponent,children:[
    
  {path:'adminchat',component:AdminchatComponent},
  {path:'adduser',component:AddComponent },
  {path:'showuser',component:ShowComponent },
  {path:'showTrigger',component:TriggerComponent},
  {path:'show',component:ShowAdminComponent },
  {path:'role',component:RoleComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
