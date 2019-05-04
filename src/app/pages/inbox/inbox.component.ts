import { Component, HostBinding, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


export interface EmailElement {
      user: string;
      subject: string;
      position: 1;
    }
    
    const ELEMENT_DATA: EmailElement[] = [
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'},
      {position: 1, user: 'RodMaster', subject: 'Tarefa 123 Aguardando Merge'}
    ];

@Component({
      selector: 'inbox',
      templateUrl: './inbox.component.html' ,
      styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

	@HostBinding('class.message-opened')
	@Input() opened = false;

	@Input() avatar = '';
	@Input() from = 'RodMaster';
	@Input() subject = 'Tarefa 123 Esperando MR';
	@Input() body = 'A tarefa 123 foi finalizada e está agora esperando MR';
	@Input() recieved = new Date();

	@Input() avatar2 = '';
	@Input() from2 = 'Alê';
	@Input() subject2 = 'Esperando Criação de Issue';
	@Input() body2 = 'A tarefa 123 foi finalizada e está agora esperando MR';
	@Input() recieved2 = new Date();

	@Input() avatar3 = '';
	@Input() from3 = 'Anderson';
	@Input() subject3 = '20 minutin dá pra fazer';
	@Input() body3 = 'A tarefa 123 foi finalizada e está agora esperando MR';
	@Input() recieved3 = new Date();

	@Input() avatar4 = '';
	@Input() from4 = 'DenisBala';
	@Input() subject4 = 'Mudança de status para Concluida da tarefa 234';
	@Input() body4 = 'A tarefa 123 foi finalizada e está agora esperando MR';
	@Input() recieved4 = new Date();

	@Input() avatar5 = '';
	@Input() from5 = 'RodMaster';
	@Input() subject5 = 'Tarefa 123 Esperando MR';
	@Input() body5 = 'A tarefa 123 foi finalizada e está agora esperando MR';
	@Input() recieved5 = new Date();

	@Output() removed = new EventEmitter<void>();
	@Output() reply = new EventEmitter<{ to: string, subject: string }>();

	constructor(public dialog: MatDialog) {}

	onOpenToggle(): void {
		this.opened = !this.opened;
	}

	onReply(): void {
		this.reply.emit({
			to: this.from,
			subject: `RE: ${this.subject}`
		});
	}

	ngOnInit() {
		//See Issue https://github.com/angular/angular/issues/14748
		setTimeout(() => this.dialog.open(DialogJustMockup));
	}
}

@Component({
	selector: 'dialog-just-mockup',
	templateUrl: 'dialog-just-mockup.component.html',
})
export class DialogJustMockup {}
