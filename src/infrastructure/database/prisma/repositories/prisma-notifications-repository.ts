import { Injectable } from '@nestjs/common';
import { Notification } from '@/domain/entities/notification';
import { NotificationRepository } from '@/domain/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notifications-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const notificationPrismaData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationPrismaData,
    });
  }
}
