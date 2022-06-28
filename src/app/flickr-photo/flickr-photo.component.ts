import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { Photo } from '../models/photo.model';

@Component({
  selector: 'app-flickr-photo',
  templateUrl: './flickr-photo.component.html',
  styleUrls: ['./flickr-photo.component.css']
})
export class FlickrPhotoComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private service: FlickrService) { }

  ngOnInit(): void {
    this.service.searchPublicPhotos("dog").subscribe(res => {
      console.log(res);
      this.photos = JSON.parse(JSON.stringify(res));
    })
  }

}
