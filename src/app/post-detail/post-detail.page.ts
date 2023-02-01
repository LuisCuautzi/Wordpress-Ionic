import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpIonicService } from '../shared/wp-ionic.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  postDetial: any;

  constructor(
    private activatedRoute : ActivatedRoute,
    private wpService: WpIonicService,
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.wpService.postDetails(id).subscribe((data) => {
      this.postDetial = data;
    });
  }

  goToOrgPost() {
    window.open(this.postDetial.link, '_blank');
  }

}
