<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DeleteEvent extends Notification
{
    public $eventoNombre;
    public $personalizedMessage;
    public $eventName;
    public $envetType;

    public function __construct($eventoNombre, $personalizedMessage, $eventName, $eventType)
    {
        $this->eventoNombre = $eventoNombre;
        $this->personalizedMessage = $personalizedMessage;
        $this->eventName = $eventName;
        $this->eventType = $eventType;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('rbnmarket@gmail.com', 'ICPC')
            ->greeting('Importante!')
            ->subject($this->eventName.' '.$this->eventType. ' ha sido Cancelado.')
            ->line('Los organizadores han cancelado '. $this->eventoNombre)
            ->line($this->personalizedMessage)
            ->line('Si no te inscribiste a '.$this->eventName.', puedes ignorar este correo electrónico.')
            ->line('¡Gracias por participar!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}