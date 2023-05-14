import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=8fbc7820066cf74d25d1aac114559f7c').subscribe()

  }

}
