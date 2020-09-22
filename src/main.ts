import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import * as helmet from "helmet";
import { ConfigService } from "./Config";
import { Configuration } from "./Config/config.keys";


const Config = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new LoggerCustomService()
  });


  // security and cors ------
  app.use(helmet());
  const allowedOrigins = Config.get(Configuration.allowedOrigins);
  app.enableCors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      // return true;
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "Theeee CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  });
  //------

  // console.log("el maldito puerto", Config.port);

  // await app.listen(AppModule.port);

  await app.listen(AppModule.port, () => {
    // if (err) {

    // console.error(err);
    // Logger.error(err);
    // process.exit(1);
    // }

    console.log(
      "Servidor NestJs: \x1b[32m",
      "En linea localhost: " + AppModule.port,
      "\x1b[0m"
    );

    // Logger.info(`
    // ################################################
    // 🛡️  Server listening on port: ${AppModule.port} 🛡️
    // ################################################
    // `);
  });
}
bootstrap();
