import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-success',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-success.html'
})
export class OrderSuccessComponent implements OnInit {
  orderId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
