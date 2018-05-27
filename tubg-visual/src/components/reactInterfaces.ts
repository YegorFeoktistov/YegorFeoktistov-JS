import { TankStoreType } from './../stores/tankStore';
import { BattlefieldStoreType } from "../stores/battlefieldStore";

export interface IDefaultProps {
  bfStore?: BattlefieldStoreType;
}

export interface ITankComponentProps {
  tankStore?: TankStoreType;
}