import { Component, ViewChild } from '@angular/core'

import { HttpClient } from '@angular/common/http';

import { NgForm } from '@angular/forms'

import { Post } from '../post.model';

import { PostService } from '../post.service';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/posts/";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})


export class PostCreateComponent {
  @ViewChild('postForm') postForm!: NgForm;

  constructor(private postService: PostService, private http: HttpClient) { }

  onAddPost() {
    if(this.postForm.invalid)
      return;

    const title = this.postForm.value.title;
    const content = this.postForm.value.content;
    const currentPost = new Post('', title, content)

    this.http.post<{message: string}>(BACKEND_URL + '/posts', currentPost).subscribe({
      next: responseData => {

        this.postService.addPost(currentPost)
      }
    });




  }

}
