import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ERoles } from '../domain/enums';
import { IUser } from '../domain/types';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appAdminRole]'
})
export class AdminRoleDirective {
  @Input() public appAdminRole = false;
  private isAdmin$: Observable<IUser | null>;
  constructor(
    private auth: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
    this.isAdmin$ = this.auth.loggedUser$;
  }
  ngOnInit(): void {
    this.isAdmin$.subscribe(loggedUser => {
      if ((loggedUser && loggedUser?.role === ERoles.ADMIN)) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
}
}
