import {
  ConnectionManager,
  getConnectionManager,
  getRepository,
  Repository,
} from 'typeorm';
import ormconfig from './ormconfig';

export const getEntityRepository = <T>(name: string) => {
  const connectionManager: ConnectionManager = getConnectionManager();
  if (connectionManager.has(ormconfig.name)) {
    const entityMetadata = connectionManager
      .get(ormconfig.name)
      .entityMetadatas.find((metadata) => {
        return metadata.tableName === name;
      });
    if (entityMetadata) {
      return getRepository(entityMetadata.name) as Repository<T>;
    } else {
      return null;
    }
  }
};
