import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sent-email-reset',
  templateUrl: './sent-email-reset.component.html',
  styleUrls: ['./sent-email-reset.component.css'],
})
export class SentEmailResetComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Postinger! | Email enviado');
  }

  ngOnInit(): void {}
}
