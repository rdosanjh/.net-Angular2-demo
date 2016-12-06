import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ArticleComponent } from './article/article.component';

import { CanActivateReader } from './can-activate-reader'

const appRoutes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: CreateComponent },
    { path: 'article/:id', component: ArticleComponent },
    { path: '', component: HomeComponent }

];

export const appRoutingProviders: any[] = [
    CanActivateReader
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
