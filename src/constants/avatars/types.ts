export interface AvatarVariation {
  name: string;
  svg: string;
}

export interface AvatarStyle {
  id: string;
  name: string;
  variations: AvatarVariation[];
}
