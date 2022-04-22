import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILoginRequest, IUser } from 'src/app/core/domain/types';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  private subs: Subscription[]=[];
  constructor(private service: UsersService,private route:ActivatedRoute, private auth: AuthService, private router: Router) {
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
    this.userForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.pattern(emailPattern)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    }
    );
   }

  ngOnInit(): void {
  }

  onFormSubmit(): void{

    const data: ILoginRequest = this.userForm.value;
    const sub1 = this.auth.authenticate(data).subscribe(user =>{
      if(user){
        this.router.navigate(["/users"]);
      }else{
        throw Error("Usuario Invalido");
      }
    });
    this.subs.push(sub1);
    
  }
  onDestroy(): void{
    this.subs.forEach(sub => sub.unsubscribe());

  }
}
