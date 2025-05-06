import ARI from '../assets/logos/ARI.png';
import ATL from '../assets/logos/ATL.png';
import BAL from '../assets/logos/BAL.png';
import BUF from '../assets/logos/BUF.png';
import CAR from '../assets/logos/CAR.png';
import CHI from '../assets/logos/CHI.png';
import CIN from '../assets/logos/CIN.png';
import CLE from '../assets/logos/CLE.png';
import DAL from '../assets/logos/DAL.png';
import DEN from '../assets/logos/DEN.png';
import DET from '../assets/logos/DET.png';
import GB from '../assets/logos/GB.png';
import HOU from '../assets/logos/HOU.png';
import IND from '../assets/logos/IND.png';
import JAX from '../assets/logos/JAX.png';
import KC from '../assets/logos/KC.png';
import LAC from '../assets/logos/LAC.png';
import LAR from '../assets/logos/LAR.png';
import LV from '../assets/logos/LV.png';
import MIA from '../assets/logos/MIA.png';
import MIN from '../assets/logos/MIN.png';
import NE from '../assets/logos/NE.png';
import NFL from '../assets/logos/NFL.png';
import NO from '../assets/logos/NO.png';
import NYG from '../assets/logos/NYG.png';
import NYJ from '../assets/logos/NYJ.png';
import PHI from '../assets/logos/PHI.png';
import PIT from '../assets/logos/PIT.png';
import SEA from '../assets/logos/SEA.png';
import SF from '../assets/logos/SF.png';
import TB from '../assets/logos/TB.png';
import TEN from '../assets/logos/TEN.png';
import WSH from '../assets/logos/WSH.png';

const teamLogoMap = {
  ARI,
  ATL,
  BAL,
  BUF,
  CAR,
  CHI,
  CIN,
  CLE,
  DAL,
  DEN,
  DET,
  GB,
  HOU,
  IND,
  JAX,
  KC,
  LAC,
  LAR,
  LV,
  MIA,
  MIN,
  NE,
  NFL,
  NO,
  NYG,
  NYJ,
  PHI,
  PIT,
  SEA,
  SF,
  TB,
  TEN,
  WSH,
} as const;

export function getTeamLogo(teamAbbr: string) {
  return teamLogoMap[teamAbbr as keyof typeof teamLogoMap] || teamLogoMap.NFL;
}

export type TeamAbbr = keyof typeof teamLogoMap;
