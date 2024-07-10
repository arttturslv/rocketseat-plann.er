import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ConfirmTripModal } from './confirm-trip-modal';
import { InviteGuestsModal } from './invite-guests-modal';

import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestStep } from './steps/invite-guests-step';

export function CreateTripPage() {
    const navigate = useNavigate();

    const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);


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



    const [emailsToInvite, setEmailsToInvite] = useState(['artttur.slv@gmail.com']);

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email)
            return;

        if (emailsToInvite.includes(email))
            return

        setEmailsToInvite(
            [
                ...emailsToInvite,
                email
            ]
        )

        event.currentTarget.reset();
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(invite => invite !== emailToRemove);
        setEmailsToInvite(newEmailList)
    }

    function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        navigate('/trips/123')
    }


    return (
        <div className="h-screen flex justify-center items-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">

                <div className='flex flex-col items-center gap-3'>
                    <img src="./public/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>


                <div className='space-y-4'>
                    <DestinationAndDateStep closeGuestInput={closeGuestInput} isGuestInputOpen={isGuestInputOpen} openGuestInput={openGuestInput}/>

                    {
                        isGuestInputOpen &&
                        (
                            <InviteGuestStep emailsToInvite={emailsToInvite} openConfirmTripModal={openConfirmTripModal} openGuestModal={openGuestModal}/>
                        )
                    }

                </div>
                <p className="text-zinc-500 text-sm">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a href="#" className="text-zinc-300">termos de uso</a> e <a href="#" className="text-zinc-300">políticas de privacidade</a>.</p>
            </div>

            {
                isGuestModalOpen &&
                (
                    <InviteGuestsModal addNewEmailToInvite={addNewEmailToInvite} closeGuestModal={closeGuestModal} emailsToInvite={emailsToInvite} removeEmailFromInvites={removeEmailFromInvites} />
                )
            }

            {
                isConfirmTripModalOpen &&
                (
                    <ConfirmTripModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} />
                )
            }


        </div>
    )
}
