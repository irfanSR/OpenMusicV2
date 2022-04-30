// mengimpor dotenv dari .env dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const album = require('./api/albums/index');
const song = require('./api/songs/index');
const AlbumsService = require('./services/postgres/NotesService');
const SongsService = require('./services/postgres/NotesServiceSong');
const { AlbumsValidator, SongsValidator } = require('./validator/notes');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = Hapi.server({

    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: song,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    }]);


  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
