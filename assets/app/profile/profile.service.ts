import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { User } from "../auth/user.model";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ProfileService {
    constructor(private http: Http, private authService: AuthService) { }

    getUser() {
        const session = this.authService.getSession()

        return this.http.get(`http://localhost:3000/user/${session.username}`)
            .map((responseRecebida: Response) => responseRecebida.json().objRetrieved)
            .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}