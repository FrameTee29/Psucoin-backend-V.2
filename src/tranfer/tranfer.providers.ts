import { Transfer } from "./entity/transfer.entity";




export const transferProviders = [
  {
    provide: 'TRANSFER_REPOSITORY',
    useValue: Transfer,
  },
];