<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ChangeNotification extends Notification
{
    public $eventEditLink;

    public function __construct($eventEditLink)
    {
        $this->eventEditLink = $eventEditLink;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('rbnmarket@gmail.com', 'ICPC')
            ->greeting('Hola!')
            ->subject('El evento al que te inscribiste ha sufrido cambios')
            ->line('Los organizaadores del evento han realizado cambios en el evento al que te inscribiste.')
            ->action('Puedes ver los cambios en ', $this->eventEditLink)
            ->line('Si no te inscribiste a ningun evento, puede ignorar este correo electrónico.')
            ->line('¡Gracias por usar participar!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}