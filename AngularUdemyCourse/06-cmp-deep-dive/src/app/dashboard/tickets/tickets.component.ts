import { Component, ViewEncapsulation } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAdd(ticketData: { title: string; request: string }) {
    const ticket: Ticket = {
      id: Date.now() + '-' + Math.random().toString(),
      title: ticketData.title,
      request: ticketData.request,
      status: 'open',
    };
    this.addTicket(ticket);
    console.log(this.tickets);
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  removeTicket(ticket: Ticket) {
    this.tickets = this.tickets.filter((t) => t.id !== ticket.id);
  }

  updateTicket(ticket: Ticket) {
    this.tickets = this.tickets.map((t) => (t.id === ticket.id ? ticket : t));
  }

  onRemove(ticket: Ticket) {
    this.removeTicket(ticket);
  }

  onClose(id: string) {
    this.tickets = this.tickets.map((t) => {
      if (t.id === id) {
        return { ...t, status: 'closed' };
      }
      return t;
    });
  }
}
