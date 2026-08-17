"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = exports.Action = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
    Action["Void"] = "void";
})(Action || (exports.Action = Action = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.createMongoAbility);
        if (user.role === client_1.Role.OWNER) {
            can(Action.Manage, 'all');
        }
        else if (user.role === client_1.Role.MANAGER) {
            can(Action.Manage, 'Product', { outletId: user.outletId });
            can(Action.Manage, 'Order', { outletId: user.outletId });
            can(Action.Manage, 'User', { outletId: user.outletId });
            cannot(Action.Read, 'Product', ['costPrice']);
        }
        else if (user.role === client_1.Role.INVENTORY_STAFF) {
            can(Action.Read, 'Product', { outletId: user.outletId });
            can(Action.Update, 'Product', ['stock'], { outletId: user.outletId });
            cannot(Action.Delete, 'Product');
            cannot(Action.Read, 'Product', ['costPrice', 'sellPrice']);
        }
        else if (user.role === client_1.Role.CASHIER) {
            can(Action.Read, 'Product', { outletId: user.outletId });
            cannot(Action.Read, 'Product', ['costPrice']);
            can(Action.Create, 'Order', { outletId: user.outletId });
            can(Action.Read, 'Order', { outletId: user.outletId });
            can(Action.Void, 'Order', {
                userId: user.id,
                outletId: user.outletId
            });
        }
        return build();
    }
};
exports.CaslAbilityFactory = CaslAbilityFactory;
exports.CaslAbilityFactory = CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
//# sourceMappingURL=casl-ability.factory.js.map