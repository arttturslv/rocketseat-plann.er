import { X, Link2, Tag } from 'lucide-react'
import { Button } from '../../components/Button'
import { FormEvent } from 'react'
import { api } from '../../lib/axios';
import { useParams } from "react-router-dom";

interface CreateLinkModalProps {
    closeCreateLinkModal: () => void
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModalProps) {
    const { tripId } = useParams();

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString();
        const url = data.get('URL')?.toString();

        api.post(`/trips/${tripId}/links`, {
            title,
            url
        });

        window.document.location.reload();
    }

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className='space-y-2'>
                    <div className="flex items-center justify-between">
                        <h2 className='text-lg font-bold'>Cadastrar link</h2>
                        <button onClick={closeCreateLinkModal}><X className='size-5 text-zinc-400'></X></button>
                    </div>
                    <p className='text-sm text-zinc-400'>Todos convidados podem visualizar os links importantes.</p>
                </div>
                <form onSubmit={createLink} className="space-y-3">
                    <div className='px-4 h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Tag className='size-5 text-zinc-400' />
                        <input type="text" name="title" placeholder="Titulo do link" className="bg-transparent text-md placeholder-zinc-400 flex-1 outline-none" />
                    </div>
                    <div className='px-4 h-14 flex-1 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                        <Link2 className='size-5 text-zinc-400' />
                        <input type="text" name="URL" placeholder="URL" className="bg-transparent text-md placeholder-zinc-400 flex-1 outline-none" />
                    </div>
                    <Button type="submit" variant="primary" size="full">
                        Salvar link
                    </Button>
                </form>
            </div>
        </div>
    )
}