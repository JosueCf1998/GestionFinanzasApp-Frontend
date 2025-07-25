// spinner.component.ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIf } from "@angular/common";
import { SpinnerService } from "src/app/core/services/spinnerService.service";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: "./custom-loading.component.html",
  styleUrls: ["./custom-loading.component.scss"],
})
export class CustomLoadingComponent {
  
  constructor(public spinnerService: SpinnerService) {}

}
