import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./create-link-modal";
interface Link {
    id: string
    title: string
    url: string
}

export function ImportantLinks() {
    const { tripId } = useParams();
    const [links, setLinks] = useState<Link[]>([]);

    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    function openCreateLinkModal() {
        setIsCreateLinkModalOpen(true)
    }
    function closeCreateLinkModal() {
        setIsCreateLinkModalOpen(false)
    }

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(res => setLinks(res.data.links));
    }, [tripId]);

    return (
        <div className="space-y-6 ">
            <h2 className="font-semibold text-xl">Links importantes </h2>
            <div className="space-y-5">
                {
                    links.map(link => {
                        return (
                            <div key={link.id} className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">{link.title}</span>
                                    <a target={"_blank"} href={link.url} className="block text-xs text-zinc-400 hover:text-zinc-200  truncate">{link.url}</a>
                                </div>
                                <Link2 className="size-5 text-zinc-400 shrink-0" />
                            </div>
                        )
                    })
                }
            </div>
            <Button onClick={openCreateLinkModal} variant="secondary" size="full">
                <Plus className='size-5' />Cadastrar novo link
            </Button>
            {
                isCreateLinkModalOpen &&
                <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
            }
        </div>
    )
}