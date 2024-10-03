import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
    .forRoutes('*');
  }
}

// exclude(
//   { path: 'auth/login', method: RequestMethod.POST },
//   { path: 'auth/register', method: RequestMethod.POST },
//   // { path: 'courses', method: RequestMethod.GET },
//   { path: 'courses/:id', method: RequestMethod.GET },
//   { path: 'courses/search', method: RequestMethod.GET },
// )