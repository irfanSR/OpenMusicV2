// Untuk mapping output dan nyetarain, karena ada perbedaan di CreatedAt sama Created_at, dan UpdatedAt sama Updated_At

const mapDBToModel = ({ 
    id,
    title,
    body,
    tags,
    created_at,
    updated_at,
  }) => ({
    id,
    title,
    body,
    tags,
    createdAt: created_at,
    updatedAt: updated_at,
  });

  module.exports = { mapDBToModel };