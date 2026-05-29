import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Tarefa }
from '../../interfaces/tarefa.interface';

import { TaskItemComponent }
from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',

  standalone: true,

  imports: [
    CommonModule,
    TaskItemComponent
  ],

  templateUrl: './task-list.component.html',

  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {

  @Input()
  tarefas!: Tarefa[];

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