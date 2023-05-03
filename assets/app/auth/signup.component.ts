import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup-component.html'
})

export class SignupComponent implements OnInit {
    myForm: FormGroup

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.myForm = new FormGroup({
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, Validators.required),
            usernameTS: new FormControl(null, Validators.required),
            genreTS: new FormControl(null, Validators.required),
            birthdayTS: new FormControl(null, Validators.required),
            termsTS: new FormControl(null, Validators.required),
            emailTS: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")]),
            passwordTS: new FormControl(null, Validators.required)
        })
    }

    onSubmit() {
        if(!this.myForm.value.termsTS) return
        
        const user = new User(
            this.myForm.value.emailTS,
            this.myForm.value.passwordTS,
            this.myForm.value.firstNameTS,
            this.myForm.value.lastNameTS,
            this.myForm.value.usernameTS,
            this.myForm.value.birthdayTS,
            this.myForm.value.genreTS
        )
        this.authService.signup(user).subscribe(
            dadosSucesso => console.log(dadosSucesso),
            erro => console.log(erro)
        )
        
        this.myForm.reset()
    }
}   