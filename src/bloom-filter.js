const { NotImplementedError } = require("../extensions/index.js");

module.exports = class BloomFilter {
    /**
     * @param {number} size - the size of the storage.
     */
    constructor(size) {
        this.size = size;
        this.store = this.createStore(size);
    }

    /**
     * @param {string} item
     */
    insert(item) {
        const [hash1, hash2, hash3] = this.getHashValues(item);
        this.store[hash1 % this.size] = 1;
        this.store[hash2 % this.size] = 1;
        this.store[hash3 % this.size] = 1;
    }

    /**
     * @param {string} item
     * @return {boolean}
     */
    mayContain(item) {
        const [hash1, hash2, hash3] = this.getHashValues(item);
        return (
            this.store[hash1 % this.size] &&
            this.store[hash2 % this.size] &&
            this.store[hash3 % this.size]
        );
    }

    /**
     * Creates the data store for our filter.
     * We use this method to generate the store in order to
     * encapsulate the data itself and only provide access
     * to the necessary methods.
     *
     * @param {number} size
     * @return {Object}
     */
    createStore(size) {
        return new Array(size).fill(0);
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash1(item) {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = (hash << 5) - hash + item.charCodeAt(i);
        }
        return hash;
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash2(item) {
        let hash = 5381;
        for (let i = 0; i < item.length; i++) {
            hash = (hash << 5) + hash + item.charCodeAt(i);
        }
        return hash;
    }

    /**
     * @param {string} item
     * @return {number}
     */
    hash3(item) {
        let hash = 0;
        for (let i = 0; i < item.length; i++) {
            hash = (hash << 5) ^ (hash >> 27) ^ item.charCodeAt(i);
        }
        return hash;
    }

    /**
     * Runs all 3 hash functions on the input and returns an array of results.
     *
     * @param {string} item
     * @return {number[]}
     */
    getHashValues(item) {
        const hash1 = Math.abs(this.hash1(item));
        const hash2 = Math.abs(this.hash2(item));
        const hash3 = Math.abs(this.hash3(item));
        return [hash1, hash2, hash3];
    }
};