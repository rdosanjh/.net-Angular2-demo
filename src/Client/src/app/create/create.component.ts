import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../article.service'
import { IArticle } from '../Models/article'
import { UserService } from '../user-service.service'

import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  article: IArticle;
  route$;
  id: string;
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.userService.RedirectIfNotLoggedIn();
    this.article = <IArticle>{};

  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this.id = id;
      if (id) {
        this.articleService.GetArticle(id).subscribe(article => {
          console.log(article);
          this.article = article;
        });
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.articleService.UpdateArticle(this.article)
        .subscribe(success => {
          this.router.navigateByUrl('/dashboard');
        });
    } else {

      this.articleService.SubmitArticle(this.article)
        .subscribe(success => {
          this.router.navigateByUrl('/dashboard');
        })
    }
  }

}
