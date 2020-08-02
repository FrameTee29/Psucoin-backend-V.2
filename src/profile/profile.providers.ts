import { Profile } from "./entity/profile.entity";



export const profilesProviders = [
  {
    provide: 'PROFILES_REPOSITORY',
    useValue: Profile,
  },
];