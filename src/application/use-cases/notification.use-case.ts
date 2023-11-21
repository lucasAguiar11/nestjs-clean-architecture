import { Injectable } from '@nestjs/common';
import { Content } from '../../domain/entities/content';
import { Notification } from '../../domain/entities/notification';
import { NotificationRepository } from '../../domain/repositories/notifications-repository';

export interface SendNotificationUseCaseRequest {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationUseCaseResponse {
  notification: Notification;
}

@Injectable()
export class NotificationUseCase {
  constructor(
    private readonly notificationsRepository: NotificationRepository,
  ) {}

  async create(
    request: SendNotificationUseCaseRequest,
  ): Promise<SendNotificationUseCaseResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
