export type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

export type ApiResponse<T> = {
  data: T;
};
