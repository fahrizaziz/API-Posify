"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOutletDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_outlet_dto_1 = require("./create-outlet.dto");
class UpdateOutletDto extends (0, mapped_types_1.PartialType)(create_outlet_dto_1.CreateOutletDto) {
}
exports.UpdateOutletDto = UpdateOutletDto;
//# sourceMappingURL=update-outlet.dto.js.map