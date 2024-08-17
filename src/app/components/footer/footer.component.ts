import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  totalValue: number = 0;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getTotalValue();
  }

  getTotalValue(): void {
      this.accountService.getTotalValue().subscribe(value=> this.totalValue=value);
  }
}
