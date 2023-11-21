import { Body, Controller, Get, Post } from '@nestjs/common';

import { NotificationsMapper } from '../mappers/notifications-mapper';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../input-models/create-notification-dto';
import { NotificationUseCase } from '@/application/use-cases/notification.use-case';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationUseCase: NotificationUseCase) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The notification has been successfully created.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() body: CreateNotificationDto) {
    const { content, category, recipientId } = body;

    const { notification } = await this.notificationUseCase.create({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationsMapper.toDto(notification) };
  }

  @Get('health')
  @ApiResponse({
    status: 200,
    description: 'Health check.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async health() {
    return { status: 'OK' };
  }
}
