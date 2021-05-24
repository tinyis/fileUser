import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService{

    constructor(private http: HttpClient){ }

    getData(){
        return this.http.get('assets/goods.json')
    }

    add(login:string, password:string){

      return this.http.get('http://localhost:3000/add?login='+
      login+'&password='+password);
    }
}
