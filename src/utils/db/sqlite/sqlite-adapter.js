const { open } = require('sqlite');
const { resolve } = require('path');

module.exports = class SQLiteAdapter {
    constructor(options) {
        this.options = options;
    }

    async connect() {
        const connection = await open({
            filename: this.options.filename,
            driver: this.options.driver,
        });
        this.client = connection;
        this.migrate();
    }

    async disconnect() {
        await this.client.close();
        this.client = null;
    }

    async reconectIfIsNotConnected() {
        if (!this.client || !this.client.run) {
            await this.connect();
        }
    }

    async select(sql) {
        await this.reconectIfIsNotConnected();
        return this.client.all(sql);
    }

    async delete(sql) {
        await this.reconectIfIsNotConnected();
        return this.client.run(sql);
    }

    async persist(sql, getLastInsertedId = false) {
        await this.reconectIfIsNotConnected();

        const persistResult = await this.client.run(sql);
        const result = { affectedRows: persistResult.changes };

        if (getLastInsertedId) {
            result.lastInsertedId = 1;
        }

        return result;
    }

    async persistMany(sql, batchData) {
        for (const batch of batchData) {
            await this.client.run(sql, batch);
        }

        return batchData.length;
    }

    static getInstance(options) {
        return this._instance || (this._instance = new this(options));
    }

    migrate() {
        this.client.migrate({
            force: true,
            migrationsPath: resolve('src', 'utils', 'db', 'sqlite', 'migrations'),
        });
    }
};
