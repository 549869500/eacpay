# eacpay

what API function are required：

GET Endpoints

/api/wallets/: Get wallet information

/api/txhistory/: Get Wallet's transaction history

/api/txproposals/: Get Wallet's pending transaction proposals and their status

/api/addresses/: Get Wallet's main addresses (does not include change addresses)


POST Endpoints

/api/wallets/: Create a new Wallet

/api/wallets/:id/eacpayers/: Join a Wallet in creation

/api/txproposals/: Add a new transaction proposal

/api/addresses/: Request a new main address from wallet . (creates an address on normal conditions)

/api/txproposals/:id/signatures/: Sign a transaction proposal

/api/txproposals/:id/broadcast/: Broadcast a transaction proposal

/api/txproposals/:id/rejections: Reject a transaction proposal
