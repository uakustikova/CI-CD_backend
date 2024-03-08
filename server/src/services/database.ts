import { seed } from './seeds';
import database from '../config/database';

export enum DBStatus {
  Init = 'Init',
  Starting = 'Starting',
  Started = 'Started',
  Error = 'Error',
}

class DatabaseService {
  private environment: string;

  private migrate: boolean;

  public dbStatus = DBStatus.Init;

  constructor(environment: string, migrate: boolean) {
    this.environment = environment;
    this.migrate = migrate;
  }

  private updateDbStatus() {
    // if it has not been errored it should set
    // it to started
    if (this.dbStatus !== DBStatus.Error) {
      this.dbStatus = DBStatus.Started;
    }
  }

  private successfulDBStart() {
    console.info(
      'Connection to the database has been established successfully!',
    );

    this.dbStatus = DBStatus.Started;
  }

  private errorDBStart = (err: Error) => {
    console.info('Unable to connect to the database: ', err);

    this.dbStatus = DBStatus.Error;
  };

  private wrongEnvironment() {
    console.warn(
      `Only "development", "test" and "production" are valid NODE_ENV variables but "${this.environment}" is specified!`,
    );
    return process.exit(1);
  }

  private async authenticateDB() {
    await database.authenticate();
  }

  async dropDB() {
    await database.drop({});
    await database.sync({ force: true });
  }

  async seedDB() {
    await seed();
  }

  async syncDB() {
    await database.sync();
  }

  private async startMigrateTrue() {
    await this.syncDB();
    this.successfulDBStart();
  }

  private async startMigrateFalse() {
    await this.dropDB();
    await this.syncDB();
    await this.seedDB();
    this.successfulDBStart();
  }

  private async startDev() {
    try {
      await this.authenticateDB();
      if (this.migrate) {
        await this.startMigrateTrue();
        return;
      }

      return this.startMigrateFalse();
    } catch (err) {
      return this.errorDBStart(err as Error);
    } finally {
      this.updateDbStatus();
    }
  }

  private async startTest() {
    try {
      await this.authenticateDB();

      await this.seedDB();

      return this.startMigrateFalse();
    } catch (err) {
      this.errorDBStart(err as Error);
    } finally {
      this.updateDbStatus();
    }
  }

  async startProd() {
    try {
      // NEVER EVER USE MIGRATE FALSE IN PRODUCTION
      await this.authenticateDB();
      await this.startMigrateTrue();
      // NEVER EVER USE MIGRATE FALSE IN PRODUCTION
    } catch (err) {
      this.errorDBStart(err as Error);
    } finally {
      this.updateDbStatus();
    }
  }

  public async start() {
    switch (this.environment) {
      case 'development':
        return this.startDev();
      case 'test':
        return this.startTest();
      case 'production':
        return this.startProd();
      default:
        return this.wrongEnvironment();
    }
  }

  public async close() {
    await database.close();
  }

  public async destroyAll() {
    if (this.environment === 'test') {
      await this.dropDB();
    }
  }
}

export default DatabaseService;