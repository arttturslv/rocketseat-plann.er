import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/Button";
interface InviteGuestStepProps {
    emailsToInvite: string[]
    openGuestModal: () => void
    openConfirmTripModal: () => void
}

export function InviteGuestStep({ emailsToInvite, openGuestModal, openConfirmTripModal }: InviteGuestStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <button onClick={openGuestModal} className='flex items-center gap-2 flex-1'>
                <UserRoundPlus className='size-5 text-zinc-400' />
                {
                    emailsToInvite.length > 0 ?
                        (
                            <span className="bg-transparent text-lg placeholder-zinc-100 outline-none flex-1 text-left text-zinc-400" >{emailsToInvite.length} pessoa(s) convidada(s)</span>
                        ) : (
                            <span className="bg-transparent text-lg placeholder-zinc-1000 outline-none flex-1 text-left text-zinc-400" >Quem estará na viagem?</span>
                        )
                }
            </button>
            <Button onClick={openConfirmTripModal} variant="primary">
                Confirmar viagem<ArrowRight className='size-5' />
            </Button>
        </div>
    )
}