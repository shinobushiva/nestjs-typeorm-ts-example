import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import ormconfig from './ormconfig';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const ormOptions: TypeOrmModuleOptions = {
      ...ormconfig,
      keepConnectionAlive: true,
      autoLoadEntities: false,
    };

    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;

    const connectionName = ormconfig.name;
    if (connectionManager.has(connectionName)) {
      options = connectionManager.get(connectionName).options;
    } else {
      options = ormOptions as TypeOrmModuleOptions;
    }
    return options;
  }
}
