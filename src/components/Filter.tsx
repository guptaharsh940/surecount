import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { filter } from '@/redux/features/filter-slices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/redux/store';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
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

interface Level2Props {
    level2: clientType['region'][0]['level3'][0]['level2'][0];
    dispatch: ReturnType<typeof useDispatch>;
}

interface Level3Props {
    level3: clientType['region'][0]['level3'][0];
    dispatch: ReturnType<typeof useDispatch>;
}

interface RegionProps {
    region: clientType['region'][0];
    dispatch: ReturnType<typeof useDispatch>;
}

interface ClientProps {
    client: clientType;
    dispatch: ReturnType<typeof useDispatch>;
}

const Level2: FC<Level2Props> = ({ level2, dispatch }) => (
    <ul className={level2.isExpand ? "ml-4" : "hidden"}>
        {level2.store && level2.isExpand && (
            <ul className="ml-4">
                {level2.store.map((store) => (
                    <li key={store.storeId}>
                        <Checkbox
                            checked={store.isChecked}
                            onCheckedChange={() =>
                                dispatch(filter.actions.toggleStoreCheckbox(store.storeId))
                            }
                        />
                        {store.storeName}
                    </li>
                ))}
            </ul>
        )}
    </ul>
);

const Level3: FC<Level3Props> = ({ level3, dispatch }) => (
    <ul className="ml-4">
        {level3.level2 && level3.isExpand && (
            <ul className="ml-4">
                {level3.level2.map((level2) => (
                    <li key={level2.level2Id}>
                        <Checkbox
                            checked={level2.isChecked}
                            onCheckedChange={() =>
                                dispatch(filter.actions.toggleLevel2Checkbox(level2.level2Id))
                            }
                        />
                        {level2.level2Name}
                        <Level2 level2={level2} dispatch={dispatch} />
                    </li>
                ))}
            </ul>
        )}
    </ul>
);

const Region: FC<RegionProps> = ({ region, dispatch }) => (
    <ul className="ml-2">
        {region.level3 && region.isExpand && (
            <ul className="ml-4">
                {region.level3.map((level3) => (
                    <li key={level3.level3Id}>
                        <Checkbox
                            checked={level3.isChecked}
                            onCheckedChange={() =>
                                dispatch(filter.actions.toggleLevel3Checkbox(level3.level3Id))
                            }
                        />
                        {level3.level3Name}
                        <Level3 level3={level3} dispatch={dispatch} />
                    </li>
                ))}
            </ul>
        )}
    </ul>
);

const Client: FC<ClientProps> = ({ client, dispatch }) => (
    <ul className="ml-2" key={client.clientId}>
        <li>
            <button
                onClick={() => dispatch(filter.actions.toggleClientExpand(client.clientId))}
            >
                {client.isExpand ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
            </button>{" "}
            <Checkbox
                checked={client.isChecked}
                onCheckedChange={() => dispatch(filter.actions.toggleClientCheckbox(client.clientId))}
            />
            {client.clientName}
            <ul className={client.isExpand ? "ml-4" : "hidden"}>
                {client.region.map((region) => (
                    <Region key={region.regionId} region={region} dispatch={dispatch} />
                ))}
            </ul>
        </li>
    </ul>
);

const Filter: FC = () => {
    const data = useAppSelector((state) => state.filterReducer.client);
    const dispatch = useDispatch();

    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="filter"
                        variant={"outline"}
                        className={`w-fit justify-start text-left font-normal ${!data && "text-muted-foreground"
                            }`}
                    >
                        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                        {data.length > 0 ? data[0].clientName : "Select"}
                        <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-60 overflow-auto min-w-80 w-auto p-0" align="start">
                    <div className="m-4">
                        {data.map((client) => (
                            <Client key={client.clientId} client={client} dispatch={dispatch} />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default Filter;
