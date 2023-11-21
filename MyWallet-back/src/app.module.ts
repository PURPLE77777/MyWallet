import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SectionModule } from './section/section.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'
import { WalletModule } from './wallet/wallet.module'
import { AuthModule } from './auth/auth.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
	imports: [UserModule, WalletModule, TransactionModule, SectionModule, AuthModule, PaginationModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
