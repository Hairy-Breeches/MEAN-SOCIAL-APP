import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs';

import { Post } from '../post.model'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  private expand = false;
  posts: Post[] = [];
  private postServiceSub!: Subscription;

  constructor(private renderer: Renderer2, private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPost()

    this.postServiceSub = this.postService.postsUpdated.subscribe({
      next: posts => {
          this.posts = posts;
        }
    })
  }


  onClickPostItem(postItem: HTMLDivElement) {
    // console.dir(postItem)
    if(this.expand) {
      this.renderer.removeClass(postItem, 'expand')
      this.expand = !this.expand;
    } else {
      this.renderer.addClass(postItem, 'expand')
      this.expand = !this.expand
    }



  }

  ngOnDestroy(): void {
    this.postServiceSub.unsubscribe();
  }

}
