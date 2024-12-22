import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [RouterLinkActive, RouterLink, RouterOutlet, MatToolbar, MatSidenavContainer, MatNavList, MatListItem, MatSidenav, MatSidenavContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TurnoverMe-Front';
  constructor() {}
}
