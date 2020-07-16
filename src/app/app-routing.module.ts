import { AuthGuard } from './user/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'kanban', loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule), canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
