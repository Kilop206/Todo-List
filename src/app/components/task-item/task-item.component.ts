import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Tarefa }
from '../../interfaces/tarefa.interface';

@Component({
  selector: 'app-task-item',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './task-item.component.html',

  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent {

  @Input()
  tarefa!: Tarefa;

  @Output()
  remover =
    new EventEmitter<number>();

  @Output()
  toggle =
    new EventEmitter<number>();

  @Output()
  editar =
    new EventEmitter<number>();

  @Output()
  salvar =
    new EventEmitter<number>();
}