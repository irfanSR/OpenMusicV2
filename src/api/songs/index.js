// Modul API yg plug N pLay, gaperlu banyak diubah kecuali handler.js ada function baru atau ada modul API baru
const SongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'song',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator);
    server.route(routes(songsHandler));
  },
};
