import {ITenantRepository} from "../../domain/tenant.repository";
import { Tenant } from '../../domain/tenant.entity'
import {IPasswordHasherRepository} from "../services/password/password-hasher.repository";

interface ICreateTenantDto {
    name: string,
    email: string,
    password: string,
    planId: string,
}

export class CreateTenantUseCase {
    constructor(
        private readonly tenantRepository: ITenantRepository,
        private readonly passwordHasher: IPasswordHasherRepository
    ) {}

    async execute(dto: ICreateTenantDto) {
        const { name, email, password, planId } = dto

        const existing = await this.tenantRepository.findByEmail(email)
        if(existing) throw new Error('Email already exists')

        const hashedPassword = await this.passwordHasher.hash(password);
        const tenant = Tenant.create({ name, email, password: hashedPassword, planId })
        return this.tenantRepository.create(tenant)
    }

}