import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ConfirmTripModal } from './confirm-trip-modal';
import { InviteGuestsModal } from './invite-guests-modal';

import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>();

    const [confirmTripProgressState, setConfirmTripProgressState] = useState(0);


    function openGuestInput() {
        setIsGuestInputOpen(true)
    }
    function closeGuestInput() {
        setIsGuestInputOpen(false)
    }

    function openGuestModal() {
        setIsGuestModalOpen(true)
    }
    function closeGuestModal() {
        setIsGuestModalOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }
    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

    function addNewEmailToInvite(email: string) {
    
     
        if (emailsToInvite.includes(email))
            return

        setEmailsToInvite(
            [
                ...emailsToInvite,
                email
            ]
        )

    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(invite => invite !== emailToRemove);
        setEmailsToInvite(newEmailList)
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!destination)
            return

        if (!eventStartAndDates?.from || !eventStartAndDates?.to)
            return

        if (emailsToInvite.length === 0)
            return

        if (!ownerEmail || !ownerName)
            return

        setConfirmTripProgressState(prev => prev = 1);
        api.post('/trips', {
            destination: destination,
            starts_at: eventStartAndDates?.from,
            ends_at: eventStartAndDates?.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail
        }).then((res) => {
            const { tripId } = res.data;
            console.log(tripId)
            navigate(`/trips/${tripId}`)
            setConfirmTripProgressState(prev => prev = 0);
        })
    }


    return (
        <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">

                <div className='flex flex-col items-center gap-3'>
                    <img src="./public/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>


                <div className='space-y-4'>
                    <DestinationAndDateStep
                        closeGuestInput={closeGuestInput}
                        isGuestInputOpen={isGuestInputOpen}
                        openGuestInput={openGuestInput}
                        setDestination={setDestination}
                        setEventStartAndDates={setEventStartAndDates}
                        eventStartAndDates={eventStartAndDates}
                    />

                    {
                        isGuestInputOpen &&
                        (
                            <InviteGuestStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestModal={openGuestModal} />
                        )
                    }

                </div>
                <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300">termos de uso</a> e <a href="#" className="text-zinc-300">políticas de privacidade</a>.</p>
            </div>

            {
                isGuestModalOpen &&
                (
                    <InviteGuestsModal
                        addNewEmailToInvite={addNewEmailToInvite}
                        closeGuestModal={closeGuestModal}
                        emailsToInvite={emailsToInvite}
                        removeEmailFromInvites={removeEmailFromInvites} />
                )
            }

            {
                isConfirmTripModalOpen &&
                (
                    <ConfirmTripModal
                        closeConfirmTripModal={closeConfirmTripModal}
                        createTrip={createTrip}
                        setOwnerName={setOwnerName}
                        setOwnerEmail={setOwnerEmail}
                        confirmTripProgressState={confirmTripProgressState}
                    />
                )
            }


        </div>
    )
}
