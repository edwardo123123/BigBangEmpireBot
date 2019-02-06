import DataObject from '../utils/dataObject';

export type movieRaw = {
  id: number;
  character_id: number;
  character_level: number;
  guild_id: number;
  set: string;
  title: string;
  custom_title: boolean;
  cover_rect_type: number;
  cover_background_type: number;
  cover_border_type: number;
  cover_layout_type: number;
  cover_layout_new_type: number;
  cover_font_type: number;
  cover_actor_type: number;
  cover_filter_type: number;
  cover: string;
  status: number;
  rating: number;
  fans: number;
  energy: number;
  stat: number;
  needed_energy: number;
  duration: number;
  ts_end: number;
  movie_quest_id: number;
  movie_quest_pool: string;
  claimed_stars: number;
  rewards_star_1: string;
  rewards_star_2: string;
  rewards_star_3: string;
  votes: number;
  rank: number;
};

export default class Movie extends DataObject<movieRaw> {
  id: number;
  characterId: number;
  characterLevel: number;
  guildId: number;
  set: string;
  title: string;
  customTitle: boolean;
  coverRectType: number;
  coverBackgroundType: number;
  coverBorderType: number;
  coverLayoutType: number;
  coverLayoutNewType: number;
  coverFontType: number;
  coverActorType: number;
  coverFilterType: number;
  cover: string;
  status: number;
  rating: number;
  fans: number;
  energy: number;
  stat: number;
  neededEnergy: number;
  duration: number;
  tsEnd: number;
  movieQuestId: number;
  movieQuestPool: string;
  claimedStars: number;
  rewardsStar1: string;
  rewardsStar2: string;
  rewardsStar3: string;
  votes: number;
  rank: number;

  get isWaitingForClaim() {
    if (this.energy * 10 >= this.neededEnergy && this.claimedStars < 1) {
      return true;
    }

    if (this.energy * 2.5 >= this.neededEnergy && this.claimedStars < 2) {
      return true;
    }

    if (this.energy >= this.neededEnergy && this.claimedStars < 3) {
      return true;
    }

    return false;
  }

  get isWaitingForFinish() {
    return this.claimedStars >= 3;
  }
}
