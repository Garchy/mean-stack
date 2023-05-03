import { RouterModule, Routes } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { MessagesComponent } from "./messages/messages.component";
import { ProfileComponent } from "./profile/profile.component";
import { AUTH_ROUTES } from "./auth/auth.routers";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/mensagens', pathMatch: 'full'},
    {path: 'mensagens', component: MessagesComponent},
    {path: 'perfil', component: ProfileComponent},
    {path: 'autenticacao', component: AuthenticationComponent, children: AUTH_ROUTES}
]

export const myrouting = RouterModule.forRoot(APP_ROUTES)