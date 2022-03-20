import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() toggleMainMenu = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  toggleMainMenuHandler(): void {
    console.log('%c *-*-* toggleMainMenuHandler *-*-*', 'color:#bada55;', );
    this.toggleMainMenu.emit();
  }

}
