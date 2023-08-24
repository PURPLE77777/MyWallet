import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SectionModule } from './section/section.module'
import { TransactionModule } from './transaction/transaction.module'
import { UserModule } from './user/user.module'
import { WalletModule } from './wallet/wallet.module'

@Module({
	imports: [UserModule, WalletModule, TransactionModule, SectionModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
