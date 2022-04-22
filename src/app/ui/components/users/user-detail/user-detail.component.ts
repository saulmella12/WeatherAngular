import { IUser } from '../../../../core/domain/types';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: IUser | undefined;
  private subs: Subscription[]=[];
  constructor(private service: UsersService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      const sub = this.service.getUserById( userId ).subscribe( resp => this.user = resp );
      this.subs.push(sub);
    }
  }

  onDestroy(): void{
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
