import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Message } from "./message.model";
import { MessageService } from "./message.service";


@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    //providers: [MessageService]
})

export class MessageInputComponent{
    constructor(private messageService: MessageService){}

    onSubmit(form: NgForm){
        this.messageService.addMessage(form.value.myContentngForm)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => alert(dadosErro.error)
            );
        form.resetForm();
    }

    onSave(textoConsole: string){
        this.messageService.addMessage(textoConsole);
        console.log(textoConsole);
    }
}