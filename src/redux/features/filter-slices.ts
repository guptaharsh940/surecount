import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    client: Array<clientType>;
};

type clientType = {
    isExpand: boolean;
    clientId: number;
    clientName: string;
    region: Array<regionType>;
    isChecked: boolean;
};

type regionType = {
    isExpand: boolean;
    regionId: number;
    regionName: string;
    isChecked: boolean;
    level3: Array<level3Type>;
};

type level3Type = {
    level3Name: string;
    isExpand: boolean;
    level3Id: number;
    isChecked: boolean;
    level2: Array<level2Type>;
};

type level2Type = {
    isExpand: boolean;
    level2Name: string;
    level2Id: number;
    store: Array<storeType>;
    isChecked: boolean;
};

type storeType = {
    storeName: string;
    storeId: number;
    isChecked: boolean;
};

const initialState: InitialState = {
    client: [],
};

export const filter = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setfilter: (state, action: PayloadAction<Array<clientType>>) => {
            return {
                ...state,
                client: action.payload,
            };
        },
        toggleClientCheckbox: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => {
                    if (client.clientId === action.payload) {
                        return {
                            ...client,
                            isChecked: !client.isChecked,
                            region: client.region.map((region) => ({
                                ...region,
                                isChecked: !client.isChecked,
                            })),
                        };
                    }
                    return client;
                }),
            };
        },
        toggleRegionCheckbox: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => {
                        if (region.regionId === action.payload) {
                            return {
                                ...region,
                                isChecked: !region.isChecked,
                                level3: region.level3.map((level3) => ({
                                    ...level3,
                                    isChecked: !region.isChecked,
                                })),
                            };
                        }
                        return region;
                    }),
                })),
            };
        },
        toggleLevel3Checkbox: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => ({
                        ...region,
                        level3: region.level3.map((level3) => {
                            if (level3.level3Id === action.payload) {
                                return {
                                    ...level3,
                                    isChecked: !level3.isChecked,
                                    level2: level3.level2.map((level2) => ({
                                        ...level2,
                                        isChecked: !level3.isChecked,
                                        store: level2.store.map((store) => ({
                                            ...store,
                                            isChecked: !level3.isChecked,
                                        })),
                                    })),
                                };
                            }
                            return level3;
                        }),
                    })),
                })),
            };
        },
        toggleLevel2Checkbox: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => ({
                        ...region,
                        level3: region.level3.map((level3) => ({
                            ...level3,
                            level2: level3.level2.map((level2) => {
                                if (level2.level2Id === action.payload) {
                                    return {
                                        ...level2,
                                        isChecked: !level2.isChecked,
                                        store: level2.store.map((store) => ({
                                            ...store,
                                            isChecked: !level2.isChecked,
                                        })),
                                    };
                                }
                                return level2;
                            }),
                        })),
                    })),
                })),
            };
        },
        toggleStoreCheckbox: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => ({
                        ...region,
                        level3: region.level3.map((level3) => ({
                            ...level3,
                            level2: level3.level2.map((level2) => ({
                                ...level2,
                                store: level2.store.map((store) => {
                                    if (store.storeId === action.payload) {
                                        return {
                                            ...store,
                                            isChecked: !store.isChecked,
                                        };
                                    }
                                    return store;
                                }),
                            })),
                        })),
                    })),
                })),
            };
        },
        toggleRegionExpand: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => {
                        if (region.regionId === action.payload) {
                            return {
                                ...region,
                                isExpand: !region.isExpand,
                            };
                        }
                        return region;
                    }),
                })),
            };
        },
        toggleLevel3Expand: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => ({
                        ...region,
                        level3: region.level3.map((level3) => {
                            if (level3.level3Id === action.payload) {
                                return {
                                    ...level3,
                                    isExpand: !level3.isExpand,
                                };
                            }
                            return level3;
                        }),
                    })),
                })),
            };
        },
        toggleLevel2Expand: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => ({
                    ...client,
                    region: client.region.map((region) => ({
                        ...region,
                        level3: region.level3.map((level3) => ({
                            ...level3,
                            level2: level3.level2.map((level2) => {
                                if (level2.level2Id === action.payload) {
                                    return {
                                        ...level2,
                                        isExpand: !level2.isExpand,
                                    };
                                }
                                return level2;
                            }),
                        })),
                    })),
                })),
            };
        },
        toggleClientExpand: (state, action: PayloadAction<number>) => {
            return {
                ...state,
                client: state.client.map((client) => {
                    if (client.clientId === action.payload) {
                        return {
                            ...client,
                            isExpand: !client.isExpand,
                        };
                    }
                    return client;
                }),
            };
        },
    },
});

export const {
    setfilter,
    toggleClientCheckbox,
    toggleRegionCheckbox,
    toggleLevel3Checkbox,
    toggleLevel2Checkbox,
    toggleStoreCheckbox,
    toggleRegionExpand,
    toggleLevel3Expand,
    toggleLevel2Expand,
    toggleClientExpand,
} = filter.actions;
export default filter.reducer;
