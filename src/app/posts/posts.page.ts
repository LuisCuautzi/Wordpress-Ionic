import { Component, OnInit } from '@angular/core';
import { WpIonicService } from '../shared/wp-ionic.service';
import { LoadingController } from '@ionic/angular'
//import { IonSlides } from '@ionic/angular';

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
      console.log('Total de Publicaciones: (' + this.postCount + ')');
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

    progra=[
      "https://assemblerinstitute.com/wp-content/uploads/2022/10/blogpost-02.png",
      "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/02/lenguaje-programacion-1859691.jpg?tf=3840x",
      "https://d2k7w3fmrpj0w4.cloudfront.net/advices/photos/000/000/798/medium/999c58e98401e287626190d3aff58c48d3411610.jpg?1642017136",
      "https://talently.tech/blog/wp-content/uploads/2022/03/que-se-necesita-estudiar-para-ser-programador-scaled-1200x900.jpg",
      "https://amexvid.com/wp-content/uploads/2019/04/AMEXVID_post05.png"
    ];

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Sing out', url: '/folder/Trash', icon: 'log-out' },
  ];
  public labels = [
    { title: 'Family', icon: 'library' }, 
    { title: 'Friends', icon: 'skull' }, 
    { title: 'Notes', icon: 'musical-notes' }, 
    { title: 'Work', icon: 'code-working' }, 
    { title: 'Travel', icon: 'send' }, 
    { title: 'Reminders', icon: 'calendar' },
  ];

}



