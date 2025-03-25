import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.service';
import { TaskService } from '../task.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonButton,
    IonInput,
    FormsModule, CommonModule
  ],
})
export class HomePage implements OnInit {

  tasks$!: Observable<Task[]>;
  newTaskName: string = '';
  newapellidoName: string = '';
  newMatriculaName: string = '';
  newDAMMNName: string = '';
  newOCAName: string = '';
  newPMPName: string = '';
  newM3DName: string = '';




  //almacenes temporales para las variables que se van a editarr
  editingTaskId: string | null = null;
  editedTaskName: string = '';
  editedapellidoName: string = '';
  editedMatriculaName: string = '';
  editedDAMMNName: string = '';
  editedOCAName: string = '';
  editedPMPName: string = '';
  editedM3DName: string = '';
  

  constructor(private taskService: TaskService, private router: Router, private authService: AuthService, private alertController: AlertController) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    const name = this.newTaskName.trim();
    const apellido = this.newapellidoName.trim();
    const Matricula = this.newMatriculaName.trim();
    const DAMMN = this.newDAMMNName.trim();
    const OCA = this.newOCAName.trim();
    const PMP = this.newPMPName.trim();
    const M3D = this.newM3DName.trim();




    if (!name) {
      alert('El nombre de cancion es obligatorio');
      return;
    }

    if (!apellido) {
      alert('El nombre del autor es obligatorio');
      return;
    }

    if (!Matricula) {
      alert('El enlace de la canción es obligatorio');
      return;
    }




    const newTask: Task = { name, apellido, Matricula, DAMMN, OCA, PMP, M3D };

    this.taskService.addTask(newTask)
      .then(() => {
        console.log('calificacion agregada');
        this.newTaskName = '';
        this.newapellidoName = '';
        this.newMatriculaName = '';
        this.newDAMMNName = '';
        this.newOCAName = '';
        this.newPMPName = '';
        this.newM3DName = '';

      })
      .catch((err: unknown) => console.error('Error al agregar cancion:', err));
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .then(() => console.log('Cancion eliminada'))
      .catch((err: unknown) => console.error('Error al eliminar la cancion:', err));
  }

  //edicion de tareas inicia ;D

  startEdit(task: Task) {
    this.editingTaskId = task.id!;
    this.editedTaskName = task.name;
    this.editedAuthorName = task.author;
    this.editedLinkName = task.link; // Agregar el campo 'link'
  }

  //guardar los cambios de la edicion

  saveEdit(taskId: string) {
    const name = this.editedTaskName.trim();
    const apellido = this.editedapellidoName.trim();
    const Matricula = this.editedMatriculaName.trim();
    const DAMMN = this.editedDAMMNName.trim();
    const OCA = this.editedOCAName.trim();
    const PMP = this.editedPMPName.trim();
    const M3D = this.editedM3DName.trim();

    



    if (!name || !author || !link) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.taskService.updateTask(taskId, { name, author, link })
      .then(() => {
        console.log('Canción actualizada');
        this.editingTaskId = null;
        this.editedTaskName = '';
        this.editedapellidoName = '';
        this.editedMatriculaName = '';
        this.editedDAMMNName = '';
        this.editedOCAName = '';
        this.editedPMPName = '';
        this.editedM3DName = '';
        // Limpiar el campo 'link'
      })
      .catch((err: unknown) => console.error('Error al actualizar canción:', err));
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo cerrar sesión. Inténtalo de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}

export interface Task {
  id?: string;
  name: string;
  apellido: string;
  Matricula: string;
  DAMMN: string;
  OCA: string;
  PMP: string;
  M3D: string;
}