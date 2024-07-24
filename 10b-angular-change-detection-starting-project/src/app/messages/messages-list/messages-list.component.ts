import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// TRIGERRING CHANGE DETECTION MANUALLY
export class MessagesListComponent /* implements OnInit, OnDestroy */ {
  ////private destroyRef = inject(DestroyRef);

  // messages = input.required<string[]>();
  ////private cdRef = inject(ChangeDetectorRef);

  private messagesService = inject(MessagesService);

  ////messages: string[] = [];

  // Alternate version, no need for destroyRef, etc
  // Asynchronous pipe in the template will handle the subscription
  altVersionMessages$ = this.messagesService.messages$;

  // ngOnDestroy(): void {
  //   console.log('MessagesListComponent in ngOnDestroy destroyed.');
  // }

  // ngOnInit(): void {
  //   // TRIGERRING CHANGE DETECTION MANUALLY
  //   const subscription = this.messagesService.messages$.subscribe(
  //     (messages: string[]) => {
  //       this.messages = messages;
  //       this.cdRef.markForCheck();
  //     }
  //   );
  //   // CLEAN UP SUSCRIPTION ON DESTROY
  //   this.destroyRef.onDestroy(() => {
  //     console.log('MessagesListComponentin destroy ref destroyed.');
  //     subscription.unsubscribe();
  //   });
  // }

  // get messages() {
  //   return this.messagesService.allMessages;
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
