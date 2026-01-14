import { DashboardKpis } from "./dashboard-kpis";
import { RevenueByDay } from "./revenue-by-day";
import { OrdersByStatus } from "./orders-by-status";
import { RecentOrder } from "./recent-order";
import { TopProduct } from "./top-product";
import { LowStockVariant } from "./low-stock-variant";

export interface AdminDashboard {
  kpis: DashboardKpis;
  revenueByDay: RevenueByDay[];
  ordersByStatus: OrdersByStatus[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  lowStock: LowStockVariant[];
}
