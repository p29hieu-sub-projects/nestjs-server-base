import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { CONFIG_JWT } from "@/config";
import { UsersModule } from "@/modules/users/users.module";
import { AuthService } from "@/modules/auth/auth.service";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { LocalStrategy } from "@/modules/auth/strategies/local.strategy";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: CONFIG_JWT.secret,
      signOptions: { expiresIn: CONFIG_JWT.timeout },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
