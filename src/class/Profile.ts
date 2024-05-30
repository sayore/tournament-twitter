export interface Profile {
  avatar: string;
  banner: string;
  biography: string;
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  mediaCount: number;
  isPrivate: boolean;
  isVerified: boolean;
  likesCount: number;
  listedCount: number;
  location: string;
  name: string;
  pinnedTweetIds: string[];
  tweetsCount: number;
  url: string;
  userId: string;
  username: string;
  isBlueVerified: boolean;
  joined: string;
  website: string;
  fetchDate: number;
}