import { Component, OnInit } from '@angular/core';
import { Comentario } from '../models/Comentario';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  public seccion: Comentario["seccion"] = "about";

  constructor() {}

  ngOnInit(): void {

  }
}
