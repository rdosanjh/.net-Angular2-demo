import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs'

import { IArticle } from './Models/Article'

@Injectable()
export class ArticleService {
  _userArticles: Subject<any> = new Subject<any>();
  userArticles$ = this._userArticles.asObservable();
  constructor(private api: ApiService) { }

  GetArticle(id: string) {
    return this.api.get('/api/Article/' + id)
      .map(a => this.extractData<IArticle>(a));
  }

  GetAllArticles() {
    return this.api.get('/api/Article')
      .map(d => this.extractData<IArticle[]>(d));
  }

  GetUserArticles() {
    this.api.get('/api/UserArticles')
      .map(this.extractData).toPromise().then(articles => {
        this._userArticles.next(articles);
      })
    return this.userArticles$;
  }

  RemoveArticle(id: string) {
    let result = this.api.delete('/api/Article/' + id);
    this.GetUserArticles();
    return result;
  }

  SubmitArticle(article: IArticle) {
    return this.api.post('/api/Article', article);
  }

  UpdateArticle(article: IArticle) {
    return this.api.put('/api/Article/' + article.id, article);

  }

  private extractData<T>(data: Response): T {
    return <T>data.json();
  }

}
