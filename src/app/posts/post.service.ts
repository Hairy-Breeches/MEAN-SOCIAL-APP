import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostDataStorageService } from './posts-data-storgare.service';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient, private postDataStorageService: PostDataStorageService) { }

  addPost(currentPost: Post): void {
    this.http.post<{message: string, id: string}>('http://16.170.108.222/api/posts', currentPost).subscribe({
      next: responseData => {
        currentPost.id = responseData.id
        console.log('response: ', responseData)
        this.posts.push(currentPost);
        this.postsUpdated.next(this.posts.slice())
      }
    });

    

  }

  getPost() {
    this.http.get<{message: string, posts: {_id: string, title: string, content: string, __v: number}[]}>('http://16.170.108.222/api/posts')
    .pipe(map(responseData => {
      return responseData.posts.map((post: {_id: string, title: string, content: string, __v: number}) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        }
      })

    }))
    .subscribe(
      posts => {
        this.posts = posts;
        this.postsUpdated.next(this.posts.slice());

      }
    )
}

}
