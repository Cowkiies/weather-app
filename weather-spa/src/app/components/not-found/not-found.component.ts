import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div id="content">
        <h1>Page not found 404</h1>
        The page you're looking for doesn't exist, please return to the <a routerLink="/">homepage</a>.
   </div>
  `
})

export class NotFoundComponent implements OnInit {
  constructor () { }

  ngOnInit (): void {
  }
}
