import localStorage from "./local.storage.js";

const providers = {
    local: localStorage,
};

const providerName =
    process.env.STORAGE_PROVIDER || "local";

const storage =
    providers[providerName];

if (!storage) {
    throw new Error(
        `Storage provider "${providerName}" không được hỗ trợ.`
    );
}

export default storage;