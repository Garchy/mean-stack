import { Component, Input, OnInit } from "@angular/core";
import * as moment from 'moment';

import { ProfileService } from "./profile.service";
import { Profile } from "./profile.model";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    profile: Profile;

    constructor(private profileService: ProfileService, private authService: AuthService){}

    ngOnInit(): void {
        if(!this.authService.isLoggedIn()) return

        this.profileService.getUser()
            .subscribe(
                (dadosSucesso: Profile) => {
                    this.profile = dadosSucesso;
                    this.profile.birthday = moment(new Date(this.profile.birthday))
                        .format('L')
                },
                dadosErro => console.log(dadosErro)
            )
    }
    
}