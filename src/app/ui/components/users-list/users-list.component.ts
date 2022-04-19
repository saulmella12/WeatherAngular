import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/domain/types';
import { UsersService } from 'src/app/core/services/users.service';

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

}
