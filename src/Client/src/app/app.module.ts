import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

import { routing,
    appRoutingProviders }  from './app.routing';
import { SectionBoxComponent } from './section-box/section-box.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import {UserService} from './user-service.service'
import {ApiService} from './api.service';
import {ArticleService} from './article.service';
import {LikeService} from './like.service';

import { UserStatusComponent } from './user-status/user-status.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './create/create.component';
import { ArticleComponent } from './article/article.component';
import { LikeGraphComponent } from './like-graph/like-graph.component'

class MyRequestOptions extends BaseRequestOptions {
    constructor() {
        super();
    }
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        AboutComponent,
        SectionBoxComponent,
        HomeComponent,
        RegisterComponent,
        UserStatusComponent,
        DashboardComponent,
        CreateComponent,
        ArticleComponent,
        LikeGraphComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [
        appRoutingProviders,
        UserService,
        ApiService,
        ArticleService,
        LikeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
