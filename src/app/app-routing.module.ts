import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SavedBuildsComponent } from './saved-builds/saved-builds.component';

const routes: Routes = [
  {path: 'build', component: BuildTabComponent},
  {path: 'saved_builds', component: SavedBuildsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
