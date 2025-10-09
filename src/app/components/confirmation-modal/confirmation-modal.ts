import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  imports: [NgClass],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css'
})
export class ConfirmationModal {
  @Input() message!: string;
  @Input() isDanger: boolean = false;
  @Output() isConfirmed = new EventEmitter<boolean>();


  onConfirm(): void {
    this.isConfirmed.emit(true);
  }

  onClose(): void {
    this.isConfirmed.emit(false);
  }
}