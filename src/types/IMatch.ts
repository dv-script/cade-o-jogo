import { ITeam } from "./ITeam";

interface IScore {
  goalsHome: number;
  goalsAway: number;
  goalsHomeByWo: null | number;
  goalsAwayByWo: null | number;
  penaltiesDecisionHomeLoss: number;
  penaltiesDecisionAwayLoss: number;
  penaltiesDecisionHomeGoal: number;
  penaltiesDecisionAwayGoal: number;
  penaltiesHome: null | number;
  penaltiesAway: null | number;
  draw: boolean;
  homeWin: boolean;
  awayLoss: boolean;
  homeLoss: boolean;
  awayWin: boolean;
}

interface ISDEMatch {
  jogo_id: number;
  sede_id: null | number;
  arbitro_auxiliar_1_id: null | number;
  arbitro_auxiliar_2_id: null | number;
  equipe_mandante_id: number;
  equipe_visitante_id: number;
  tecnico_mandante_id: null | number;
  arbitro_principal_id: null | number;
  tecnico_visitante_id: null | number;
}

interface IChronology {
  calendarType: string;
  id: string;
}

interface IDateOfMatch {
  nano: number;
  dayOfYear: number;
  dayOfWeek: string;
  month: string;
  dayOfMonth: number;
  year: number;
  monthValue: number;
  hour: number;
  minute: number;
  second: number;
  chronology: IChronology;
}

export interface IMatch {
  homeTeamDetails?: ITeam;
  awayTeamDetails?: ITeam;
  hasNarration: boolean;
  sequenceMatch: null | number;
  dateUndefined: boolean;
  hourUndefined: boolean;
  round: number;
  hasCoachHomeRedCard: boolean;
  hasCoachAwayRedCard: boolean;
  numberStaffHomeYellowCard: null | number;
  numberStaffHomeRedCard: null | number;
  numberStaffAwayYellowCard: null | number;
  numberStaffAwayRedCard: null | number;
  idChampionship: number;
  cupName: string;
  idTeamHome: number;
  coachHome: null | string;
  idCoachHome: null | number;
  idTeamAway: number;
  coachAway: string;
  idCoachAway: number;
  idStadium: number;
  referee: null | string;
  idReferee: null | number;
  attendance: null | number;
  ticketCollected: null | number;
  matchGroup: string;
  hasCoachHomeYellowCard: boolean;
  hasCoachAwayYellowCard: boolean;
  stadium: string;
  teamHome: string;
  teamAway: string;
  idGameTime: number;
  inserted: string;
  updated: string;
  championship: string;
  isoDate: string;
  playOffKey: null | string;
  realtime: boolean;
  finished: boolean;
  phase: string;
  gameTime: string;
  hasScout: boolean;
  id: number;
  sde: ISDEMatch;
  gameScore: IScore;
  date: IDateOfMatch;
}
