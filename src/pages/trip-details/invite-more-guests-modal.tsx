import { X, AtSign, Plus } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/Button'

interface InviteMoreGuestsModalProps {
    closeGuestModal: () => void
    emailsInvited: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    isStatusOfInvited: boolean
}

export function InviteMoreGuestsModal(
    {
        addNewEmailToInvite, closeGuestModal, isStatusOfInvited, emailsInvited
    }: InviteMoreGuestsModalProps) {

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className='space-y-2'>
                    <div className="flex items-center justify-between">
                        <h2 className='text-lg font-bold'>Adicione mais convidados</h2>
                        <button onClick={closeGuestModal}><X className='size-5 text-zinc-400'></X></button>
                    </div>
                    <p className='text-sm text-zinc-400'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
                </div>
                <div className='flex flex-wrap gap-2'>
                    {
                        emailsInvited.map((email, i) => (
                            <div key={i}
                                className='bg-zinc-800 text-zinc-300 py-1.5 px-2.5 rounded-md flex items-center gap-3'>
                                <span className='text-zinc-300'>{email}</span>
                            </div>
                        ))
                    }
                </div>

                <div className='w-px h-full bg-zinc-800'></div>

                <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                    <div className='flex items-center gap-2 px-2 flex-1 '>
                        <AtSign className='size-5 text-zinc-400' />
                        <input type="text" name="email" placeholder={isStatusOfInvited ? "Digite o e-mail do convidado" : "E-mail invalido!"} className={isStatusOfInvited ? "bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" : "bg-transparent text-lg placeholder-red-400 flex-1 outline-none animate-wiggle"} />
                    </div>
                    <Button type='submit' variant="primary">
                        Convidar<Plus className='size-5' />
                    </Button>
                </form>
            </div>
        </div>
    )
}