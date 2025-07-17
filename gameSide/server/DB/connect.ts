import mysql from 'mysql2/promise';

class MysqlEngine {
  private static connections: Record<string, mysql.Connection> = {};

  public static async get(database: string = 'sys'): Promise<mysql.Connection> {
    if (this.connections[database]) {
      return this.connections[database];
    }

    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST ?? 'localhost',
      user: process.env.MYSQL_USER ?? 'root',
      password: process.env.MYSQL_PASSWORD ?? 'root',
      database,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
      multipleStatements: true
    });

    this.connections[database] = connection;
    return connection;
  }
}

export async function createDatabase(databaseName: string, charset: string = 'utf8mb4') {
 
  const connection = await MysqlEngine.get();

  const query = `CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET ${charset}`;
  
  try {
    await connection.query(query);
    console.log(`✅ Conneced to database '${databaseName}' successfully.`);
  } catch (err) {
    console.error(`❌ Failed to create database '${databaseName}':`, err);
    throw err;
  }
}