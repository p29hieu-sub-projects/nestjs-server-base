import { Module } from "@nestjs/common";

import { AuthModule } from "@/modules/auth/auth.module";
import { UsersService } from "@/modules/users/users.service";
import { UsersController } from "@/modules/users/users.controller";
import { backendConfigs } from "@/modules/common/config/config.service";

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: "backendConfig",
      useValue: backendConfigs,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
