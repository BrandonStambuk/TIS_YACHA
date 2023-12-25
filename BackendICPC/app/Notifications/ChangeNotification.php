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
    public $eventName;
    public $envetType;

    public function __construct($eventEditLink, $personalizedMessage, $eventName, $eventType)
    {
        $this->eventEditLink = $eventEditLink;
        $this->personalizedMessage = $personalizedMessage;
        $this->eventName = $eventName;
        $this->eventType = $eventType;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('rbnmarket@gmail.com', 'ICPC')
            ->greeting('Importante!')
            ->subject($this->eventName.' '.$this->eventType.' ha sufrido cambios')
            ->line('Los organizadores han realizado cambios en '.$this->eventName)
            ->line($this->personalizedMessage)
            ->action('Por favor revisa estos cambios', $this->eventEditLink)
            ->line('Si no te inscribiste a '.$this->eventName.', puedes ignorar este correo electrónico.')
            ->line('¡Gracias por participar!');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }
}