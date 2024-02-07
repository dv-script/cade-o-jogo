interface ISDETeam {
  equipe_id: number;
}

export interface ITeam {
  country: string;
  fakeTeam: boolean;
  nationalTeam: boolean;
  urlLogo: string;
  idCoach: null | number;
  fansSingular: null | string;
  fansPlural: null | string;
  topTeam: boolean;
  stadium: null | string;
  initials: string;
  coach: null | string;
  inserted: null | string;
  updated: string;
  city: string;
  name: string;
  id: number;
  state: string;
  sde: ISDETeam;
}