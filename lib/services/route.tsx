import prisma from "@/lib/prisma";
import { TxnStatus } from "@prisma/client";

export const TransactionService = {
  /**
   * Memproses transaksi sukses dan mengupdate revenue produk/seller
   */
  async processSuccessfulTransaction(transactionId: string) {
    return await prisma.$transaction(async (tx) => {
      // 1. Ambil data transaksi dan fee subscription user
      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId },
        include: { 
          user: { include: { subscription: true } },
          product: true 
        },
      });

      if (!transaction || transaction.status === "SUCCESS") return transaction;

      // 2. Kalkulasi Net Amount berdasarkan fee di Subscription [cite: 10, 20]
      const feePercent = transaction.user.subscription?.txFee || 5.0; // Default 5% jika null 
      const feeAmount = (Number(transaction.amount) * feePercent) / 100;
      const netAmount = Number(transaction.amount) - feeAmount;

      // 3. Update status transaksi 
      const updatedTxn = await tx.transaction.update({
        where: { id: transactionId },
        data: {
          status: "SUCCESS" as TxnStatus,
          fee: feeAmount,
          netAmount: netAmount,
        },
      });

      // 4. Update akumulasi revenue dan jumlah terjual di model Product [cite: 17]
      if (transaction.productId) {
        await tx.product.update({
          where: { id: transaction.productId },
          data: {
            sold: { increment: 1 },
            revenue: { increment: netAmount },
          },
        });
      }

      return updatedTxn;
    });
  },
};