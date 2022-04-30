/* eslint-disable camelcase */

exports.shorthands = undefined;

// export.up itu lawannya export.down, yg down sebagai lawannya
// di case submission openmusic create langsung sekali 2 along with migrate up and down
exports.up = pgm => {
    pgm.createTable('song', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      title: {
        type: 'TEXT',
        notNull: true,
      },
      year: {
        type: 'INT',
        notNull: true,
      },
      genre: {
        type: 'TEXT',
        notNull: true,
      },
      performer: {
        type: 'TEXT',
        notNull: true,
      },
      duration: {
        type: 'INT',
        notNull: true,
      },
      albumId: {
        type: 'TEXT',
        notNull: true,
      },
    }),
    pgm.createTable('album', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: true,
        },
        year: {
          type: 'INT',
          notNull: true,
        },
      });
  };

//   Delete Table
  exports.down = pgm => {
    pgm.dropTable('song'),
    pgm.dropTable('album')
  };
