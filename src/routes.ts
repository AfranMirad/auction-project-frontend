import { Routes } from "@angular/router"
import { AuctionComponent } from "app/auction/auction.component"

export const appRoutes: Routes = [
  { path: "auction", component: AuctionComponent },
  { path: "", redirectTo: "/auction", pathMatch: 'full' },
]
