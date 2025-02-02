import { Component } from '@angular/core';
import { UiComponent } from "./ui/ui.component";


@Component({
  selector: 'app-root',
  imports: [UiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'schedule';
}
