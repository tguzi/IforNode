import { IAssConfig, ERelation } from './types'
// models association
const Associations: IAssConfig[] = [
  {
    origin: 'Article',
    relation: ERelation.belongsTo,
    target: 'User',
  },
  {
    origin: 'Article',
    relation: ERelation.belongsTo,
    target: 'Label',
  },
  {
    origin: 'User',
    relation: ERelation.hasMany,
    target: 'Momment',
  },
  {
    origin: 'Article',
    relation: ERelation.hasMany,
    target: 'Momment',
  },
  {
    origin: 'Period',
    relation: ERelation.hasOne,
    target: 'Topic',
  },
  {
    origin: 'Article',
    relation: ERelation.hasOne,
    target: 'Topic',
  },
  {
    origin: 'User',
    relation: ERelation.hasMany,
    target: 'Topic',
  },
  {
    origin: 'Note',
    relation: ERelation.belongsTo,
    target: 'User',
  },
  {
    origin: 'Note',
    relation: ERelation.belongsTo,
    target: 'Label',
  },
]

export default Associations