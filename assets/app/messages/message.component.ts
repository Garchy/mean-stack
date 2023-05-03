import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})

export class MessageComponent{
    constructor(private messageServiceObj: MessageService) {}

    @Input() messageVarClasse : Message = new Message("", "");
    @Input('inputMessage') messageVarClasseAlias : Message = new Message("","");

    @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();
    @Output('outputMessage') editClicked_MessageMetodoClasseAlias = new EventEmitter<string>();

    onEdit(){
        /* alert('André é um paspalho'); */
        this.editClicked_MessageMetodoClasse.emit("Texto veio de message (child) para o app (pai)")
        this.editClicked_MessageMetodoClasseAlias.emit("Texto veio de message (child) para o app (pai) - Alias")
    }

    onDelete() {
        this.messageServiceObj.deleteMessage(this.messageVarClasse)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
    }

    color = "#d1eaee";
    color1 = "red";
    tam = 12;
    fontc = '#CC33FF';
    onMudaStyle(){
        this.color = 'purple';
        this.tam = 64;
        this.fontc = 'chartreuse'
    }

}