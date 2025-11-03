import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-web-component',
  standalone: true,
  imports: [],
  template: `<p>web-component works!</p>`,
  styleUrl: './web-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebComponent { }
