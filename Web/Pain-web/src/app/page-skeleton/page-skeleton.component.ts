import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-page-skeleton',
  templateUrl: './page-skeleton.component.html',
  styleUrls: ['./page-skeleton.component.scss']
})
export class PageSkeletonComponent implements OnInit {
  theme: Theme;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private loginService : LoginService
  ) { }
  ngOnInit(): void {
    if (this.loginService.GetLogin().darkMode)
      this.theme = 'dark-theme';
    else
      this.theme = 'light-theme';

    this.initializeTheme();
  }
  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);
}
export type Theme = 'light-theme' | 'dark-theme';
