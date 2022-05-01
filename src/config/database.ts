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
      autoLoadEntities: true,
    };

    const connectionManager: ConnectionManager = getConnectionManager();
    let options: any;

    if (connectionManager.has('default')) {
      options = connectionManager.get('default').options;
    } else {
      options = ormOptions as TypeOrmModuleOptions;
    }
    return options;
  }
}
