import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filter/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptor/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Filtro Global
  app.useGlobalFilters(new AllExceptionFilter())
  //Interceptor Global
  app.useGlobalInterceptors(new TimeOutInterceptor())
  //Validaciones Global
  app.useGlobalPipes(new ValidationPipe())

  //Configuramos Swagger
  const options = new DocumentBuilder()
  .setTitle('SuperFlight Api')
  .setDescription('Scheduled Flights App')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument( app, options);

  SwaggerModule.setup('/api/docs', app , document, {
    swaggerOptions:{ //barra de busqueda
      filter: true,
    }
  });




  await app.listen(process.env.PORT || 3000);
}
bootstrap();
