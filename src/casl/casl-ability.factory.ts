import { AbilityBuilder, MongoAbility, createMongoAbility, ExtractSubjectType } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Void = 'void',
}

export type Subjects = 'User' | 'Order' | 'Product' | 'Outlet' | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.role === Role.OWNER) {
      can(Action.Manage, 'all');
    } else if (user.role === Role.MANAGER) {
      can(Action.Read, 'Outlet', { id: user.outletId });
      can(Action.Manage, 'Product', { outletId: user.outletId });
      can(Action.Manage, 'Order', { outletId: user.outletId });
      can(Action.Manage, 'User', { outletId: user.outletId });
      cannot(Action.Read, 'Product', ['costPrice']);
    } else if (user.role === Role.INVENTORY_STAFF) {
      can(Action.Read, 'Outlet', { id: user.outletId });
      can(Action.Read, 'Product', { outletId: user.outletId });
      can(Action.Update, 'Product', ['stock'], { outletId: user.outletId });
      cannot(Action.Delete, 'Product');
      cannot(Action.Read, 'Product', ['costPrice', 'sellPrice']);
    } else if (user.role === Role.CASHIER) {
      can(Action.Read, 'Outlet', { id: user.outletId });
      can(Action.Read, 'Product', { outletId: user.outletId });
      cannot(Action.Read, 'Product', ['costPrice']);
      can(Action.Create, 'Order', { outletId: user.outletId });
      can(Action.Read, 'Order', { outletId: user.outletId });
      
      // ABAC for void
      can(Action.Void, 'Order', { 
        userId: user.id,
        outletId: user.outletId
      });
    }

    return build();
  }
}
