import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationUseCase } from '@/application/use-cases/notification.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationUseCase],
})
export class PresentationModule {}
