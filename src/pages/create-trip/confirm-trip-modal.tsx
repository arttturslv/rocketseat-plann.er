import { X, User, Mail, Loader2 } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/Button'

interface ConfirmTripProps {
    closeConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerEmail: (email: string) => void
    setOwnerName: (name: string) => void
    confirmTripProgressState: number
}

export function ConfirmTripModal({ closeConfirmTripModal, confirmTripProgressState, setOwnerName, setOwnerEmail, createTrip }: ConfirmTripProps) {

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className='space-y-2'>
                    <div className="flex items-center justify-between">
                        <h2 className='text-lg font-bold'>Confirmar criação da viagem</h2>
                        <button onClick={closeConfirmTripModal}><X className='size-5 text-zinc-400'></X></button>
                    </div>
                    <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Florianópolis, Brasil</span> nas datas de <span className='text-zinc-100 font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
                </div>
                <form onSubmit={createTrip} className="space-y-3">
                    <div className='px-4 h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <User className='size-5 text-zinc-400' />
                        <input onChange={(e) => setOwnerName(e.target.value)} type="text" name="name" placeholder="Seu nome completo" className="bg-transparent text-md placeholder-zinc-400 flex-1 outline-none" />
                    </div>
                    <div className='px-4 h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Mail className='size-5 text-zinc-400' />
                        <input onChange={(e) => setOwnerEmail(e.target.value)} type="text" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-md placeholder-zinc-400 flex-1 outline-none" />
                    </div>
                    <Button type='submit' variant="primary" size="full">
                        {
                            confirmTripProgressState == 1 ?
                                <>
                                    <Loader2 className='text-lime-900 animate-spin' />
                                    Confirmando criação da viagem
                                </>
                                :
                                    'Confirmar criação da viagem'
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}