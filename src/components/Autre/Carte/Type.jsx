import React from 'react';
import './Type.scss';

const TypeBadge = ({ typeName }) => {

  // La classe CSS est construite en utilisant le nom du type en minuscules
  const className = `type-badge type-${typeName.toLowerCase()}`;
  return <span className={className}>{typeName}</span>;
};


const Type = ({ type }) => {
  // Check si le prop 'types' est un tableau
  if (!Array.isArray(type)) { 
    return null;
  }

  return (
    <div className="types-container">
      {type.map((types, index) => (
        // Utilisez typeInfo.type.name pour le nom du type
        // La clé est une combinaison de l'index et du nom du type pour garantir l'unicité
        <TypeBadge key={`${types.type.name}-${index}`} typeName={types.type.name} />
      ))}
    </div>
  );
};

export default Type;
