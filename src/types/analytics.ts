import { WhoTakeWith } from './hostPrediction';

export interface AnalyticsEvent {
  cnt: number;
  playType: WhoTakeWith | 'affiliate';
}
