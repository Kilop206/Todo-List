import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './filters.component.html',

  styleUrls: ['./filters.component.css']
})

export class FiltersComponent {

  @Input()
  filtroAtual!: string;

  @Output()
  mudarFiltro =
    new EventEmitter<
      'todas' |
      'pendentes' |
      'concluidas'
    >();
}