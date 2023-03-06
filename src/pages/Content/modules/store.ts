export default interface Comment {
    url: string;
    position: number[];
    comment: string;
    date: Date;
}

// position as key
type commentKey = number[];
// url as key
type itemKey = string;

type Item = Map<commentKey, Comment>;
type Store = Map<itemKey, Item>;

export default class StoreManager {
    private chromeStore: chrome.storage.StorageArea;
    private localStore: Store;

    constructor() {
        this.chromeStore = chrome.storage.local;
        this.localStore = new Map() as Store;
        chrome.storage.local
            .get(null)
            .then((stored: { [key: itemKey]: Item | any }) => {
                for (const key in stored) {
                    this.localStore.set(key, stored[key]);
                }
            });
    }

    syncStore() {
        this.chromeStore.set(this.localStore);
    }

    addComment(comment: Comment) {
        if (this.localStore.has(comment.url)) {
            const toUpdate = this.localStore.get(comment.url) || new Map();
            toUpdate.set(comment.position, comment);
            this.localStore.set(comment.url, toUpdate);
        } else {
            this.localStore.set(
                comment.url,
                new Map([[comment.position, comment]])
            );
        }
        this.syncStore();
    }

    getComments(url: string) {
        let comments: any = null;
        if (this.localStore.has(url)) {
            this.chromeStore
                .get(url)
                .then((item: { [key: string]: any }) => {
                    if (item) {
                        comments = item;
                    }
                })
                .catch((err: any) =>
                    console.log(
                        'Error getting comments from local storage:',
                        err
                    )
                );
        }
        return comments;
    }

    deleteComments(url: string | string[], position?: commentKey) {
        if (Array.isArray(url)) {
            url.forEach((u) => this.localStore.delete(u));
        } else {
            if (position) {
                const item = this.localStore.get(url);
                if (item) {
                    item.delete(position);
                    this.localStore.set(url, item);
                }
            } else {
                this.localStore.delete(url);
            }
        }
        this.syncStore();
    }
}
