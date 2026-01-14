import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { AdminDashboardService } from '../../services/admin-dashboard-service';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboardComponent {
  shortUserId(id: string): string {
  if (!id) return '';
  return id.length > 10
    ? `${id.substring(0, 8)}...${id.substring(id.length - 4)}`
    : id;
}

  private api = inject(AdminDashboardService);

  days = 30;
  lowStock = 5;

  // 🔥 ViewModel واحد
  vm$ = this.api.getDashboard(this.days, this.lowStock).pipe(
    map((res) => {
      // line chart
      const labels = res.revenueByDay.map((x) =>
        new Date(x.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
      );

      const revenueLineData = {
        labels,
        datasets: [
          {
            data: res.revenueByDay.map((x) => x.total),
            label: 'Revenue',
            tension: 0.3,
            fill: true,
          },
        ],
      };

      const statusDoughnutData = {
        labels: res.ordersByStatus.map((x) => x.status),
        datasets: [{ data: res.ordersByStatus.map((x) => x.count) }],
      };

      return {
        data: res,
        revenueLineData,
        statusDoughnutData,
      };
    }),
    startWith(null) // loading state
  );

  refresh() {
    this.vm$ = this.api.getDashboard(this.days, this.lowStock).pipe(
      map((res) => {
        const labels = res.revenueByDay.map((x) =>
          new Date(x.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        );

        return {
          data: res,
          revenueLineData: {
            labels,
            datasets: [
              {
                data: res.revenueByDay.map((x) => x.total),
                label: 'Revenue',
                tension: 0.3, // ✅ لازم
                fill: true, // ✅ لازم
              },
            ],
          },
          statusDoughnutData: {
            labels: res.ordersByStatus.map((x) => x.status),
            datasets: [{ data: res.ordersByStatus.map((x) => x.count) }],
          },
        };
      }),
      startWith(null)
    );
  }
}
