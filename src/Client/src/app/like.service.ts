import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { Observable } from 'rxJS/Observable'

@Injectable()
export class LikeService {

  constructor(private api : ApiService) { }

  LikeArticle(id : String){
    return this.api.post('/api/like', {id});
  }
  HasLiked(id : String) {    
    return this.api.get('/api/like/' + id)
        .map(result => <Boolean>result.json());;
  }
}
