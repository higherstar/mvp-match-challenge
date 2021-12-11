// Dependencies
import crypto from 'crypto';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

// User entity
import { User } from './users.entity';

/**
 * Export users subscriber
 *
 * @class UsersSubscriber
 * @implements EntitySubscriberInterface<User>
 * */
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  /**
   * @constructor
   *
   * @param {Connection} connection
   * */
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  /**
   * @member listenTo
   * */
  listenTo() {
    return User;
  }

  /**
   * @member beforeInsert
   *
   * @param {InsertEvent<User>} event
   *
   * @returns {void}
   * */
  beforeInsert(event: InsertEvent<User>): void {
    event.entity.password = crypto.createHmac('sha256', event.entity.password).digest('hex');
  }

  /**
   * @member beforeUpdate
   *
   * @param {UpdateEvent<User>} event
   *
   * @returns {void}
   * */
  beforeUpdate(event: UpdateEvent<User>): void {
    if (event.entity.password) {
      event.entity.password = crypto.createHmac('sha256', event.entity.password).digest('hex');
    }
  }
}
