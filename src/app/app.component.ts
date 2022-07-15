import { Component } from '@angular/core';
import { CrudHttpService } from './crud-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoList: any = [];

  constructor(private crudHttpService: CrudHttpService) {}

  ngOnInit() {
    this.listTodos();
  }

  listTodos() {
    this.crudHttpService
      .list()
      .subscribe((response) => (this.todoList = response));
  }

  updateTodos(id: any) {
    let data = {
      id: Date.now(),
      title: 'Some data',
    };
    console.log(data.id);
    this.crudHttpService.update(id, data).then(() => this.listTodos());
  }

  createTodo() {
    let data = {
      id: Date.now(),
      title: 'This is a new data',
    };
    this.crudHttpService.create(data).subscribe(() => this.listTodos());
  }

  deleteTodos(id: any) {
    this.crudHttpService.delete(id).subscribe(() => this.listTodos());
  }
}
