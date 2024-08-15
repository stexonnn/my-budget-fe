import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isUserLoggedIn: boolean = false;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.isLoggedIn();
  }

  logOut(): void {
    this.userService.logOut();
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']).then(()=>{window.location.reload();});
  }
}
