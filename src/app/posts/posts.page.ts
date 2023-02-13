import { Component, OnInit } from '@angular/core';
import { WpIonicService } from '../shared/wp-ionic.service';
import { LoadingController } from '@ionic/angular'
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  Posts: any;
  postCount = null;
  page = 1;

  slideOptions = {
    initialSlide: 1,
    speed: 400,
  };

  slidesDidLoad(slides: IonSlides): void {
    slides.startAutoplay();
  }

  constructor(
    private wpservice: WpIonicService,
    private loadingController: LoadingController,
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
      console.log('Total de Publicaciones: (',this.postCount,')');
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

   cars=[
    "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Front-view-52648.jpg?v=201711021421&q=80",
      "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Right-Front-Three-Quarter-52645.jpg?v=201711021421&q=80",
      "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Right-Side-52646.jpg?v=201711021421&q=80",
      "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Left-Front-Three-Quarter-52647.jpg?v=201711021421&q=80",
      "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Front-view-52649.jpg?v=201711021421&q=80",
      "https://imgd.aeplcdn.com/1056x594/ec/79/85/9802/img/ol/Lamborghini-Aventador-Rear-view-52650.jpg?v=201711021421&q=80"
    
    ];

}
