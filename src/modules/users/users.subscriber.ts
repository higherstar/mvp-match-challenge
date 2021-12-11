// Dependencies
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import crypto from 'crypto';

// User entity
import { User } from './users.entity';

// Export user subscriber
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    event.entity.password = crypto.createHmac('sha256', event.entity.password).digest('hex');
  }
}
