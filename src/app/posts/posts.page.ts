import { Component, OnInit } from '@angular/core';
import { WpIonicService } from '../shared/wp-ionic.service';
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  Posts: any;
  postCount = null;
  page = 1;

  constructor(
    private wpservice: WpIonicService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.initPosts();
  }

  async initPosts() {
    let loading = await this.loadingController.create({
      message: 'Loading ...'
    });

    await loading.present();

    this.wpservice.getAllPosts().subscribe((data: any) => {
      this.postCount = this.wpservice.allPosts;
      this.Posts = data;
      console.log('Posts', data);
      // console.log('Total de Publicaciones: (',this.postCount,')');
      console.table(data, ["id","status","author"]);
      loading.dismiss();
    });
  }

  infiniteLoad(e: any) {
    this.page++;
    this.wpservice.getAllPosts(this.page).subscribe((data) => {
      this.Posts = [...this.Posts, ...data];
      e.target.complete();

      if (this.page == this.wpservice.pages) {
        e.target.disable = true;
      }
    })
  }

  infiniteScrollDisabled() {
    if (this.wpservice.hasMorePosts()) {
        return false;
    } else {
        return true;
    }
   }

}
