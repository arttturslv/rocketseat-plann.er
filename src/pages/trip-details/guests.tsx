import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/Button";
import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { InviteMoreGuestsModal } from "./invite-more-guests-modal";

interface Participants {
    id: string
    name: string | null
    email: string
    is_confirmed: boolean
}

export function Guests() {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participants[]>([]);
    const [emailsInvited, setEmailsInvited] = useState<string[]>([]);
    const [isStatusOfInvited, setIsStatusOfInvited] = useState(true);

    const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

    function openGuestModal() {
        setIsGuestModalOpen(true)
    }
    function closeGuestModal() {
        setIsGuestModalOpen(false);
        searchForParticipants();
    }

    async function searchForParticipants() {
        api.get(`/trips/${tripId}/participants`).then(res => setParticipants(res.data.participants));
    }

    useEffect(() => {
        searchForParticipants();
    }, [tripId]);


    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsInvited.filter(invite => invite !== emailToRemove);
        setEmailsInvited(newEmailList)
    }

    async function inviteNewEmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString();

        if (!email)
            return;

        setEmailsInvited(
            [
                ...emailsInvited,
                email
            ]
        )

        api.post(`/trips/${tripId}/invites`, {
            email: email,
        }).catch(() => {
            setTimeout(() => {
                setIsStatusOfInvited(prev => prev = true);
            }, 1500)
            setIsStatusOfInvited(prev => prev = false);
            removeEmailFromInvites(email);
        })

        event.currentTarget.reset();
    }

    return (
        <div className="space-y-6 ">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                {participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                            <span className="block text-sm text-zinc-400  truncate">{participant.email}</span>
                        </div>
                        {
                            participant.is_confirmed ?
                                (
                                    <CheckCircle2 className="size-5 text-lime-400 shrink-0" />

                                ) :
                                (
                                    <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                                )
                        }
                    </div>
                ))}
            </div>
            <Button onClick={openGuestModal} variant="secondary" size="full">
                <UserCog className='size-5' />Gerenciar convidados
            </Button>
            {
                isGuestModalOpen &&
                <InviteMoreGuestsModal
                    addNewEmailToInvite={inviteNewEmail}
                    closeGuestModal={closeGuestModal}
                    emailsInvited={emailsInvited}
                    isStatusOfInvited={isStatusOfInvited}
                />
            }
        </div>
    )
}