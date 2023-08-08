// routeTypes.ts
export type AppRouteConfig = {
    path: string;
    name: string;
    component: () => Promise<any>;
    meta: {
        title: string;
        roles?: string[];
    };
    beforeEnter?: (to: any, from: any, next: any) => void;
    roles?: string[];
    children?: AppRouteConfig[];
};
  