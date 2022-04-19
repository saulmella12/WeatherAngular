import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: IUser[] = [];

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe( resp => this.users = resp );
  }

  deleteUser(userId: number):void{
    Swal.fire({
      title: '¿Deseas eliminar el usuario?',
      text: "¡Accion Irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteUser(userId).subscribe(resp=>{
          const list = this.users.filter(user => user.id != userId);
          this.users = [...list];
        });
        Swal.fire(
          'Usuario Borrado!',
          'El usuario ha sido eliminado.',
          'success'
        )
      }
    })
    
  }

}
