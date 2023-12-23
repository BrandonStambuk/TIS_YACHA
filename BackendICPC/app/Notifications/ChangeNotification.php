<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ChangeNotification extends Notification
{
    public $eventEditLink;
    public $personalizedMessage;

    public function __construct($eventEditLink, $personalizedMessage)
    {
        $this->eventEditLink = $eventEditLink;
        $this->personalizedMessage = $personalizedMessage;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('rbnmarket@gmail.com', 'ICPC')
            ->greeting('Hola!')
            ->subject('El evento al que te inscribiste ha sufrido cambios')
            ->line('Los organizadores han realizado cambios en el evento al que te inscribiste.')
            ->line($this->personalizedMessage)
            ->action('Por favor revisa estos cambios', $this->eventEditLink)
            ->line('Si no te inscribiste a ningún evento, puedes ignorar este correo electrónico.')
            ->line('¡Gracias por participar!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}