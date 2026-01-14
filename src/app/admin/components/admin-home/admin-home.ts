import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-home.html',
})
export class AdminHome {
}
