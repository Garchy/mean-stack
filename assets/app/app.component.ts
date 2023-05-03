import { Component } from '@angular/core';  
import { Message } from './messages/message.model';
import { MessageService } from './messages/message.service';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService, AuthService, ProfileService]
})

export class AppComponent {
    messageBinding: Message = new Message("Texto da Mensagem", "ViniciusRosalen");
    messageBindingAlias: Message = new Message("Texto da Mensagem Alias", "ViniciusRosalenAlias");
    valorNgSwitch: number;
    nomeNgSwitch: string = ''

    messageS: Message[] = [
        new Message("Texto da mensagem", "ViniciusRosalen"),
        new Message("Texto 2 da mensagem", "RosalenSilva"),
        new Message("Texto 3 da mensagem", "SilvaVinicius")
    ]
    mostrarElemento: boolean = true

    onMudaMostrarElemento() {
        this.mostrarElemento = !this.mostrarElemento
    }
    
}