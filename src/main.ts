import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, INestApplication } from "@nestjs/common";
import detect = require("detect-port");

import { AppModule } from "@/app.module";
import { CONFIG_PORT } from "@/config";
import { LoggingInterceptor } from "@/interceptors/logging/logging.interceptor";
import { ResponseInterceptor } from "@/interceptors/response/response.interceptor";
import { MyExceptionFilter } from "@/exceptions/my-exception.filter";

function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Chat nestjs example")
    .setDescription("The Chat API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new MyExceptionFilter());

  const port = CONFIG_PORT;
  // get ports can use
  try {
    const _port = await detect(port);

    createSwagger(app);
    await app.listen(_port);

    if (port === _port) {
      console.log(`port: ${port} was not occupied`);
    } else {
      console.log(`port: ${port} was occupied, try port: ${_port}`);
    }
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
