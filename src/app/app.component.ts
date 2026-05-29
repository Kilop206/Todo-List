import {
  Component,
  computed,
  signal,
  effect,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FiltersComponent }
from './components/filters/filters.component';
import { Tarefa }
from './interfaces/tarefa.interface';
import { TaskListComponent }
from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    FiltersComponent,
    TaskListComponent
  ],

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})

export class AppComponent {

  platformId = inject(PLATFORM_ID);

  novaTarefa = signal('');

  tarefas = signal<Tarefa[]>([]);

  filtroAtual =
    signal<'todas' | 'pendentes' | 'concluidas'>(
      'todas'
    );

  tarefasFiltradas = computed(() => {

    const filtro =
      this.filtroAtual();

    const lista =
      this.tarefas();

    switch (filtro) {

      case 'pendentes':

        return lista.filter(
          tarefa => !tarefa.concluida
        );

      case 'concluidas':

        return lista.filter(
          tarefa => tarefa.concluida
        );

      default:

        return lista;
    }
  });

  constructor() {

    if (isPlatformBrowser(this.platformId)) {

      this.carregarTarefas();

      effect(() => {

        localStorage.setItem(
          'tarefas',
          JSON.stringify(this.tarefas())
        );
      });
    }
  }

  adicionarTarefa(): void {

    if (!this.novaTarefa().trim()) return;

    this.tarefas.update(lista => [

      ...lista,

      {
        id: Date.now(),

        texto: this.novaTarefa(),

        concluida: false,

        editando: false
      }
    ]);

    this.novaTarefa.set('');
  }

  removerTarefa(id: number): void {

    this.tarefas.update(lista =>

      lista.filter(
        tarefa => tarefa.id !== id
      )
    );
  }

  toggleConcluida(id: number): void {

    this.tarefas.update(lista =>

      lista.map(tarefa =>

        tarefa.id === id
          ? {
              ...tarefa,
              concluida: !tarefa.concluida
            }
          : tarefa
      )
    );
  }

  editarTarefa(id: number): void {

    this.tarefas.update(lista =>

      lista.map(tarefa =>

        tarefa.id === id
          ? {
              ...tarefa,
              editando: true
            }
          : tarefa
      )
    );
  }

  salvarEdicao(id: number): void {

    this.tarefas.update(lista =>

      lista.map(tarefa =>

        tarefa.id === id
          ? {
              ...tarefa,
              editando: false
            }
          : tarefa
      )
    );
  }

  carregarTarefas(): void {

    const tarefasSalvas =
      localStorage.getItem('tarefas');

    if (tarefasSalvas) {

      this.tarefas.set(
        JSON.parse(tarefasSalvas)
      );
    }
  }
}