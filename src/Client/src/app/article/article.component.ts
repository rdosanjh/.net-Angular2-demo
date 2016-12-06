import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Params } from '@angular/router';
import { Observable } from 'rxJS/Observable'
import { Subscription } from 'rxJS/Subscription'
import { ArticleService } from '../article.service'
import { LikeService } from '../like.service'

import { IArticle } from '../Models/article'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  route$: Subscription;
  article$: Observable<IArticle>;
  id: string;
  likeActive: Boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private LikeService: LikeService) { }

  ngOnInit() {
    this.route$ = this.route.params.subscribe(params => {
      let id = params['id'];
      this.id = id;
      this.article$ = this.articleService.GetArticle(id);
      this.article$.subscribe(success => console.log(success));
      this.canLike();
    });
  }

  like() {
    this.LikeService.LikeArticle(this.id).subscribe(
      success=>{
        this.likeActive = false;
      }
    );
  }

  canLike() {
    this.likeActive = false; 
    this.LikeService.HasLiked(this.id)
      .subscribe(result => {
        this.likeActive = result;
      });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
  }


}
