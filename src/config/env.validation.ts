import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    VERSION: string;
    ADMIN_SECRET: string;
}

export const envsSchema = joi.object({
    PORT: joi.number().default(3000),
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    DATABASE_URL: joi.string().required(),
    VERSION: joi.string(),
    ADMIN_SECRET: joi.string(),
}).unknown(true)

const { error, value } = envsSchema.validate(process.env);

if (error) {
    throw new Error(`Config error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envValidation = {
    port: envVars.PORT,
    nodeEnv: envVars.NODE_ENV,
    databaseUrl: envVars.DATABASE_URL,
    version: envVars.VERSION,
    adminSecret: envVars.ADMIN_SECRET,
}