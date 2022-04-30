const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
// const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');


class SongsService {
    constructor() {
        this._pool = new Pool();
    }
    // #1 add notes
    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        // const createdAt = new Date().toISOString();
        // const updatedAt = createdAt;

        // testing input 1 query
        const query = {
            text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, genre, performer, duration, "albumId"],
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
    async getSongs() {


        // if (title != undefined ) {
        //     if (title = undefined) {
        //         const result = await this._pool.query('SELECT * FROM song where song.title LIKE title');
        //         return result.rows;
        //     } 
        // }




        const result = await this._pool.query('SELECT * FROM song');
        return result.rows;
    };

    //   GetNotesById
    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM song WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        // if result not found, raise an error
        if (!result.rows.length) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        //   return result
        return result.rows[0];
    };

    //   Edit Note By Id
    async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
            text: 'UPDATE song SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6 WHERE id = $7 RETURNING id',
            values: [title, year, genre, performer, duration, "albumId", id],
        };

        const result = await this._pool.query(query);

        // kalo result ga ada, raise error, dan gaperlu ngereturn value apa2 kaya di get notes dan get notesbyId
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }
    };

    // DeleteNoteById
    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM song WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
    }

};

module.exports = SongsService;