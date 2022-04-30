// Dari Serivice > inMemory > Postgres
// Fungsi yg baru ngereplace NoteService di folder services, Menggunakan teknik Pool karena sering berinteraksi dengan db
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
// const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
    constructor() {
        this._pool = new Pool();
    }
    // #1 add notes
    async addAlbum({ name, year }) {
        const id = nanoid(16);
        // const createdAt = new Date().toISOString();
        // const updatedAt = createdAt;

        // testing input 1 query
        const query = {
            text: 'INSERT INTO album VALUES($1, $2, $3) RETURNING id',
            values: [id, name, year],
        };

        // eksekusi query, Note : fungsi query run as asynchronus, jadinya si add note dan sbelum this.pool tambahin async await
        const result = await this._pool.query(query);

        // Cek apakah berhasil input atau tidak
        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return result.rows[0].id;
    };


    //   Get Notes
    // // Untuk mapping output dan nyetarain cek di folder utils > index.js, karena ada perbedaan di CreatedAt sama Created_at, dan UpdatedAt sama Updated_At
    async getAlbums() {
        const result = await this._pool.query('SELECT * FROM album');
        // return fungsi dari getNotes
        return result.rows;
    };

    //   GetNotesById
    async getAlbumById(id) {
        

        const query = {
            text: 'SELECT * FROM album WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        // if result not found, raise an error
        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }
        //   return result
        return result.rows[0];
    };

    //   Edit Note By Id
    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE album SET name = $1, year = $2 WHERE id = $3 RETURNING id',
            values: [name, year, id],
        };

        const result = await this._pool.query(query);

        // kalo result ga ada, raise error, dan gaperlu ngereturn value apa2 kaya di get notes dan get notesbyId
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
    };

    // DeleteNoteById
    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM album WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    };

};


module.exports =  AlbumsService;