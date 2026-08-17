import { MongoAbility } from '@casl/ability';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Void = "void"
}
export type Subjects = 'User' | 'Order' | 'Product' | 'Outlet' | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;
export declare class CaslAbilityFactory {
    createForUser(user: any): AppAbility;
}
