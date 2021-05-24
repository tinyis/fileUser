import { Component } from '@angular/core';
import { HttpService} from './http.service';
import {Good} from './good';

@Component({
  selector: 'app-root',
  template: `<ul>
            <li *ngFor="let good of goods">
            <p>Title: {{good?.title}}</p>
            <p>Price: {{good?.price}}</p>
            <p>Quantity: {{good?.quantity}}</p>
            </li>
            </ul>
            <div class="form-group">
                <label>Login</label>
                <input class="form-control" type="text" name="login" [(ngModel)]="login" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input class="form-control" type="text" name="password" [(ngModel)]="password" />
            </div>
            <div class="form-group">
                <button class="btn btn-default" (click)="submit()">OK</button>
            </div>
            <div *ngIf="done">{{res}}</div>`,
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent {
  title = 'goodsList';

  goods: Good[]=[];

  login:string="";
  password:string="";
  res:string="";
  done:boolean=false;

  constructor(private httpService: HttpService){}

  submit(){

      this.httpService.add(this.login, this.password).subscribe((data:any) => {
      this.res=data.result;
      console.log(data.result);
      this.done=true;
      alert(this.res);
  });

  }

  ngOnInit(){

      this.httpService.getData().subscribe((data:any) => this.goods=data["goodList"]);
  }
}
