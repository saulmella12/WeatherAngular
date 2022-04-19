import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: IUser | undefined;
  userForm: FormGroup;
  constructor(private service: UsersService,private route:ActivatedRoute) {
    this.userForm = new FormGroup({
      'name': new FormControl(this.user?.name, [Validators.required]),
      'email': new FormControl(this.user?.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.user?.password, [Validators.required]),
      'enabled': new FormControl(this.user?.enabled),
      'createdAt': new FormControl(this.user?.createdAt, [Validators.required])
    }
      
    );
   }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.service.getUserById( userId ).subscribe( resp => this.user = resp );
      console.log("ID usuario: "+this.user?.id);  
      console.log("Nombre usuario: "+this.user?.name);
    }
  }

  onFormSubmit(): void{
    console.log(this.user?.name);
    if(this.userForm.invalid){
      console.log(this.userForm.errors);
      throw Error('Formulario Invalido');
    }
    const userData: IUser = this.userForm.value;
    
    this.service.addUser(userData).subscribe(console.log)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario Creado',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
