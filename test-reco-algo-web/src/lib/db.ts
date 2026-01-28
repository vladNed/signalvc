
export interface RecoConfig {
    id?: number;
    name: string;
    location: {
        country: string;
        region?: string;
    };
    domains: string[];
    businessCategories: string[];
    targetMarkets: string[];
    sliders: {
        countries: number;
        businessCategories: number;
        targetMarkets: number;
    };
    createdAt: Date;
}

const DB_NAME = "RecoConfigDB";
const STORE_NAME = "configs";
const DB_VERSION = 1;

export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };
    });
};

export const saveConfig = async (config: Omit<RecoConfig, "id" | "createdAt">): Promise<number> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add({ ...config, createdAt: new Date() });

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as number);
    });
};

export const getAllConfigs = async (): Promise<RecoConfig[]> => {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as RecoConfig[]);
    });
};

export const deleteDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(DB_NAME);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
};
