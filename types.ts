export type Team = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

export type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

export type ApiResponse<T> = {
  data: T;
};
