// Modul API yg plug N pLay, gaperlu banyak diubah kecuali handler.js ada function baru atau ada modul API baru
const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'album',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler(service, validator);
    server.route(routes(albumsHandler));
  },
};
