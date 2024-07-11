import { MapPin, Calendar, Settings2, X } from "lucide-react";
import { Button } from "../../components/Button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

interface Trip {
    id: string
    destination: string
    starts_at: string
    ends_at: string
    is_confirmed: boolean
}

export function DestinationAndDateHeader() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | undefined>();
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>();

    function closeDatePicker() {
        setIsDatePickerOpen(false);
    }
    function openDatePicker() {
        setIsDatePickerOpen(true);
    }


    function modifyOriginalDates(event: FormEvent<HTMLButtonElement>) {
            event.preventDefault();
    
            if (!destination)
                return
    
            if (!eventStartAndDates?.from || !eventStartAndDates?.to)
                return
    
            api.put(`/trips/${tripId}`, {
                destination: destination,
                starts_at: eventStartAndDates?.from,
                ends_at: eventStartAndDates?.to,
            }).then((res) => {
                const { tripId } = res.data;
                console.log(tripId)
                window.document.location.reload();
            })
    }

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(res => setTrip(res.data.trip));
    }, [tripId]);

    const displayedDate = trip
        ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL"))
        : null;

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <MapPin className="size-5 text-zinc-400" />
                <span className="text-base text-zinc-100">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex gap-2 items-center">
                    <Calendar className="size-5 text-zinc-400" />
                    <span className="text-base text-zinc-100">{displayedDate}</span>
                </div>
                <div className='w-px h-6 bg-zinc-800'></div>
                <Button onClick={openDatePicker} variant="secondary">
                    Alterar local/data<Settings2 className='size-5' />
                </Button>
            </div>

            {
                isDatePickerOpen &&
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className=" rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                        <div className='space-y-2'>
                            <div className="flex items-center justify-between">
                                <h2 className='text-lg font-bold'>Selecione a data</h2>
                                <button onClick={closeDatePicker}><X className='size-5 text-zinc-400'></X></button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className='p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 '>
                                <MapPin className='size-5 text-zinc-400' />
                                <input onChange={(e) => setDestination(e.target.value)} type="text" placeholder="Para onde você vai? " className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                            </div>
                            <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                                <DayPicker mode="range" selected={eventStartAndDates} onSelect={setEventStartAndDates} />
                            </div>
                        </div>
                        <Button onClick={(event)=>modifyOriginalDates(event)} type='submit' variant={destination.length > 0 && eventStartAndDates ? "primary" : "secondary" } size="full">
                            Modificar datas
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}