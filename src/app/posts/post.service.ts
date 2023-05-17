import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PostDataStorageService } from './posts-data-storgare.service';

import { Subject } from 'rxjs';

import { Post } from './post.model';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  postsUpdated: Subject<Post[]> = new Subject<Post[]>();

  constructor(private http: HttpClient, private postDataStorageService: PostDataStorageService) { }

  addPost(post: Post): void {
    this.posts.push(post);
    this.postsUpdated.next(this.posts.slice())

  }

  getPost() {
    this.http.get<{message: string, posts: Post[]}>(BACKEND_URL + '/posts').subscribe(
      posts => {
        this.posts = posts.posts;
        this.postsUpdated.next(this.posts.slice());

      }
    )

  }

}
