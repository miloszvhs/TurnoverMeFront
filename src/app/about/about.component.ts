import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
}
