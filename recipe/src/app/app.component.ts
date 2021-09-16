import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'recipe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe';
  loadedFeature = 'recipe';


  constructor(private authService: AuthService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}