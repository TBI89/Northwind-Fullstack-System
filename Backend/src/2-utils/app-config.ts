class AppConfig {
    public readonly port = process.env.PORT;
    public readonly mysqlHost = process.env.HOST;
    public readonly mysqlUser = process.env.USER;
    public readonly mysqlPassword = process.env.PASSWORD;
    public readonly mysqlDatabase = process.env.DATABASE_NAME;
    public readonly domainName = process.env.ORIGIN;
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV ==="production")? new ProductionConfig(): new DevelopmentConfig();

export default appConfig;