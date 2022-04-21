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
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    this.userForm = new FormGroup({
      'id': new FormControl(this.user?.id),
      'name': new FormControl(this.user?.name, [Validators.required]),
      'email': new FormControl(this.user?.email, [Validators.required, Validators.email, Validators.pattern(emailPattern)]),
      'password': new FormControl(this.user?.password, [Validators.required]),
      'enabled': new FormControl(this.user?.enabled),
      'createdAt': new FormControl(this.user?.createdAt, [Validators.required])
    }
    );
   }

   ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if(userId)
    {
      this.service.getUserById(userId).subscribe( resp2 => this.user = resp2)
      setTimeout(() => {
        this.userForm.controls['name'].setValue(this.user?.name);
        this.userForm.controls['password'].setValue(this.user?.password);
        this.userForm.controls['email'].setValue(this.user?.email);
        this.userForm.controls['enabled'].setValue(this.user?.enabled);
        this.userForm.controls['createdAt'].setValue(this.getDate(this.user?.createdAt));
        console.log(this.user);
    }, 1000);
    }
  }
  private getDate(fechaCompleta:string|undefined): string {
    var anio = fechaCompleta?.substring(0,4);
    var mes = fechaCompleta?.substring(5,7);
    var dia = fechaCompleta?.substring(8,10);
    return anio+"-"+mes+"-"+dia;
  } 

  onFormSubmit(): void{
    if(this.userForm.invalid){
      console.log(this.userForm.errors);
      throw Error('Formulario Invalido');
    }else if (this.user?.id == undefined){
      const userData: IUser = this.userForm.value;
      this.service.addUser(userData).subscribe(console.log);
      console.log("Usuario Creado con ID: "+this.user?.id)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Creado',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(this.user.id != undefined){
      const userData2: IUser = this.userForm.value;
      userData2.id=this.user.id;
      this.service.updateUser(userData2).subscribe(console.log);
      console.log("Usuario actualizado con ID: "+this.user.id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
