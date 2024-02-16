import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '@/redux/features/filter-slices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { store, useAppSelector } from '@/redux/store';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { fetchfilterdata } from '@/api/getfilterdata';
type clientType = {
    isExpand: boolean;
    clientId: number;
    clientName: string;
    region: Array<regionType>;
    isChecked: boolean;
}
type regionType = {
    isExpand: boolean;
    regionId: number;
    regionName: string;
    isChecked: boolean;
    level3: Array<level3Type>;
}
type level3Type = {
    level3Name: string;
    isExpand: boolean;
    level3Id: number;
    isChecked: boolean;
    level2: Array<level2Type>;
}
type level2Type = {
    isExpand: boolean;
    level2Name: string;
    level2Id: number;
    store: Array<storeType>;
    isChecked: boolean;
}
type storeType = {
    storeName: string;
    storeId: number;
    isChecked: boolean;
}

type StoreType = {
    storeName: string;
    storeId: number;
    isChecked: boolean;

};

interface Level2Props {
    level2: clientType['region'][0]['level3'][0]['level2'][0];
    check: boolean;
    ids: { clientId: number; regionId: number; level3Id: number; };
}

interface Level3Props {
    level3: clientType['region'][0]['level3'][0];
    check: boolean;
    ids: { clientId: number; regionId: number; };
}

interface RegionProps {
    region: clientType['region'][0];
    check: boolean;
    ids: { clientId: number }
}

interface ClientProps {
    client: clientType;
}

interface Storeprops {
    store: StoreType;
    check: boolean;
    ids: { clientId: number; regionId: number; level3Id: number; level2Id: number; };
}



const Store: FC<Storeprops> = ({ store, check, ids }) => {
    const [isChecked, setIsChecked] = useState(check);
    useEffect(() => {
        setIsChecked(check)
    }, [check])
    const dispatch = useDispatch();
    useEffect(() => {
        if (isChecked) {
            dispatch(filter.actions.addstore({ ...ids, installId: store.storeId }))
        }
        else {
            dispatch(filter.actions.removestore({ ...ids, installId: store.storeId }))
        }
    }, [isChecked])

    return (
        <ul className="ml-2" key={store.storeId}>
            <li >
                <div className='flex items-center space-x-1.5 space-y-1'>

                    <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <label
                        htmlFor="terms"
                        className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >

                        {store.storeName}
                    </label>
                </div>

            </li>
        </ul>
    );
};



const Level2: FC<Level2Props> = ({ level2, check, ids }) => {
    const [isExpand, setIsExpand] = useState(level2.isExpand);
    const [isChecked, setIsChecked] = useState(check);
    useEffect(() => {
        setIsChecked(check)
    }, [check])


    return (
        <ul className="ml-2" key={level2.level2Id}>
            <li>
                <div className='flex items-center space-x-1.5'>

                    <button onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>{" "}
                    <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >

                        {level2.level2Name}
                    </label>
                </div>

                <ul className={isExpand ? "ml-4" : "hidden"}>
                    {level2.store.map((store) => (
                        <Store key={store.storeId} store={store} check={isChecked} ids={{ ...ids, level2Id: level2.level2Id }} />
                    ))}
                </ul>
            </li>
        </ul>
    );
};


const Level3: FC<Level3Props> = ({ level3, check, ids }) => {
    const [isExpand, setIsExpand] = useState(level3.isExpand);
    const [isChecked, setIsChecked] = useState(check);
    useEffect(() => {
        setIsChecked(check)
    }, [check])

    return (
        <ul className="ml-2" key={level3.level3Id}>
            <li>
                <div className='flex items-center space-x-1.5'>

                    <button onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>{" "}
                    <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >

                        {level3.level3Name}
                    </label>
                </div>

                {level3.level2 && (<ul className={isExpand ? "ml-4" : "hidden"}>
                    {level3.level2.map((level2) => (
                        <Level2 key={level2.level2Id} level2={level2} check={isChecked} ids={{ ...ids, level3Id: level3.level3Id }} />
                    ))}
                </ul>)}
            </li>
        </ul>
    );
};

const Region: FC<RegionProps> = ({ region, check, ids }) => {
    const [isExpand, setIsExpand] = useState(region.isExpand);
    const [isChecked, setIsChecked] = useState(check);

    useEffect(() => {
        setIsChecked(check)
    }, [check])


    return (
        <ul className="ml-2" key={region.regionId}>
            <li >
                <div className='flex items-center space-x-1.5'>

                    <button onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>{" "}
                    <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >

                        {region.regionName}
                    </label>
                </div>
                <ul className={isExpand ? "ml-4" : "hidden"}>
                    {region.level3.map((level3) => (
                        <Level3 key={level3.level3Id} level3={level3} check={isChecked} ids={{ ...ids, regionId: region.regionId }} />
                    ))}
                </ul>
            </li>
        </ul>
    );
};

const Client: FC<ClientProps> = ({ client }) => {
    const temp = useAppSelector((state) => (state.filterReducer))
    const [isExpand, setIsExpand] = useState(client.isExpand);
    const [isChecked, setIsChecked] = useState(client.isChecked);

    return (
        <ul className="ml-2" key={client.clientId}>
            <li >
                <div className='flex items-center space-x-1.5'>


                    {/* <div className='flex-none'> */}

                    <button onClick={() => setIsExpand(!isExpand)}>
                        {isExpand ? <FontAwesomeIcon icon={faMinus} className='text-sm' /> : <FontAwesomeIcon icon={faPlus} />}
                    </button>{" "}
                    {/* </div> */}
                    <Checkbox checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    {/* <div className='flex-none'> */}
                    <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >

                        {client.clientName}
                    </label>
                    {/* </div> */}
                </div>
                <ul className={isExpand ? "ml-4" : "hidden"}>
                    {client.region.map((region) => (
                        <Region key={region.regionId} region={region} check={isChecked} ids={{ clientId: client.clientId }} />
                    ))}
                </ul>
            </li>
        </ul>
    );
};

const Filter: FC = () => {
    const [data, setData] = useState<clientType[]>([]);
    const [selectedClient, setSelectedClient] = useState<clientType | null>(null);

    const fetch = async () => {
        const dam = await fetchfilterdata();
        setData(dam);
        setSelectedClient(dam[0])
    }
    useEffect(() => {
        fetch();
    })


    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="filter"
                        variant={"outline"}
                        className={`w-fit justify-start text-left font-normal ${!selectedClient && "text-muted-foreground"}`}
                    >
                        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                        {selectedClient ? selectedClient.clientName : "Select"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-60 overflow-auto min-w-80 w-auto p-0" align="start">
                    {<div className="m-4">
                        {data ? (data.map((client) => (
                            <Client key={client.clientId} client={client} />
                        ))) : (<div>Loading</div>)}
                    </div>}
                </PopoverContent>
            </Popover>

        </div>
    );
};

export const Filterforform: FC = () => {
    const [data, setData] = useState<clientType[]>([]);

    const fetch = async () => {
        const dam = await fetchfilterdata();
        setData(dam);
    }
    useEffect(() => {
        fetch();
    })
    return (
        <div className="grid gap-2">

            {<div className="m-4 h-44 w-full overflow-scroll">
                {data ? (data.map((client) => (
                    <Client key={client.clientId} client={client} />
                ))) : (<div>Loading</div>)}
            </div>}
        </div>
    );
}

export default Filter;
