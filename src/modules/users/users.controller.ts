import { AppThrottlerGuard } from "@/guards/app-throttler.guard";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import {
  backendConfigs,
  IBackendConfig,
} from "@/modules/common/config/config.service";
import { CurrentUser } from "@/modules/users/current-user.decorator";
import { CreateUserDto } from "@/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/users/dto/update-user.dto";
import { User } from "@/modules/users/schema/users.schema";
import { UsersService } from "@/modules/users/users.service";
import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

let backendConfig: IBackendConfig = backendConfigs;
@UseGuards(AppThrottlerGuard)
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject("backendConfig") private readonly _backendConfig: IBackendConfig,
  ) {
    backendConfig = this._backendConfig;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(CacheInterceptor)
  @Throttle(2, parseInt(backendConfig.THROTTLER_TTL))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @SkipThrottle()
  @UseGuards(JwtStrategy)
  @Patch(":id")
  update(
    @CurrentUser() user: User,
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
