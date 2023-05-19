/**
 * 数据库类接口
 * Redis | Mongo | MySQL 等，皆可使用此类
 */

export interface IDbConfig {
  db;
  /**
   * 数据库连接选项
   */
  options: {
    /**
     * 数据库端口
     */
    port: string;
    /**
     * 数据库主机
     */
    host: string;
    /**
     * 数据库登录密码
     */
    password: string;
    /**
     * 数据库账号
     */
    username: string;
    /**
     * 缓存端口号
     */
    db?: number | string;
  };
  /**
   * 数据库连接字
   */
  uri: string;
}
