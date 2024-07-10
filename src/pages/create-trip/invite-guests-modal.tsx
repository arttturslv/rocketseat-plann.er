import { X, AtSign, Plus } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/Button'

interface InviteGuestsModalProps {
    closeGuestModal: () => void
    emailsToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal(
    {
        addNewEmailToInvite, closeGuestModal, emailsToInvite, removeEmailFromInvites
    }: InviteGuestsModalProps) {


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className='space-y-2'>
                    <div className="flex items-center justify-between">
                        <h2 className='text-lg font-bold'>Selecionar convidados</h2>
                        <button onClick={closeGuestModal}><X className='size-5 text-zinc-400'></X></button>
                    </div>
                    <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {
                        emailsToInvite.map((email, i) => (
                            <div key={i} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-3'>
                                <span className='text-zinc-300'>{email}</span>
                                <button onClick={() => removeEmailFromInvites(email)}><X className='size-5'></X></button>
                            </div>
                        ))
                    }
                </div>

                <div className='w-px h-full bg-zinc-800'></div>

                <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <div className='flex items-center gap-2 px-2 flex-1 '>
                        <AtSign className='size-5 text-zinc-400'/>
                        <input type="text" name="email" placeholder="Digite o e-mail do convidado" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
                    </div>
                    <Button type='submit' variant="primary">
                        Convidar<Plus className='size-5' /> 
                    </Button>
                </form>

            </div>
        </div>
    )
}