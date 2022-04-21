import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  constructor(private service: UsersService,private route:ActivatedRoute) {
    //const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    this.userForm = new FormGroup({
      'email': new FormControl(''),
      'password': new FormControl('')
    }
    );
   }

  ngOnInit(): void {
  }

  onFormSubmit(): void{
    const usuario = this.service.getUserByEmail(this.userForm.get('email')?.value,this.userForm.get('password')?.value);
    usuario.subscribe( data => {
      //this.results.push(data);
     if(data && data.id) {
       usuario.subscribe(console.log);
     } else {
       console.log("VUELVE A PROBAR")
     }
    });
    
    
    
  }
}
