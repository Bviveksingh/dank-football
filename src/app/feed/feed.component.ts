import { Component, OnInit } from '@angular/core';
import {faBolt,faUserCircle,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  faBolt = faBolt;
  faTimes = faTimes;
  faUserCircle = faUserCircle;
  constructor() { }

  ngOnInit() {
  }

}
