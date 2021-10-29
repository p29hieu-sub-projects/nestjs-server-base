import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { CONFIG_JWT } from "@/config";
import { JwtPayload } from "@/modules/auth/auth.service";

export interface JwtPayloadResponse extends JwtPayload {
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      ignoreExpiration: false,
      secretOrKey: CONFIG_JWT.secret,
    });
  }

  async validate(payload: JwtPayloadResponse): Promise<JwtPayloadResponse> {
    console.log("JwtStrategy payload", payload);
    return payload;
  }
}
