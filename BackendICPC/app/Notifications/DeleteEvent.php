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

    public function __construct($eventoNombre, $personalizedMessage)
    {
        $this->eventoNombre = $eventoNombre;
        $this->personalizedMessage = $personalizedMessage;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('rbnmarket@gmail.com', 'ICPC')
            ->greeting('Importante!')
            ->subject('El evento al que te inscribiste' . $this->eventoNombre . ' ha sido Cancelado.')
            ->line('Los organizadores han cancelado el evento al que te inscribiste.')
            ->line($this->personalizedMessage)
            ->line('Si no te inscribiste a ningún evento, puedes ignorar este correo electrónico.')
            ->line('¡Gracias por participar!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}
