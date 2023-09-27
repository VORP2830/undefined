import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Title',
  templateUrl: './Title.component.html',
  styleUrls: ['./Title.component.css']
})
export class TitleComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = '';
  @Input() link!: string;
  @Input() botaoListar = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  listar(): void {
    if(this.link != null) {
      this.router.navigate([`/${this.link.toLocaleLowerCase()}/lista`]);
    }
    else{
      this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
    }
  }

}
