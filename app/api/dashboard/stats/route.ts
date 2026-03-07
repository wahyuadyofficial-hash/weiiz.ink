import { NextResponse } from "next/server";
import { TransactionService } from "@/lib/services/transaction-service";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Contoh untuk Midtrans: Ambil order_id [cite: 22]
    const { order_id, transaction_status } = body;

    if (transaction_status === "settlement" || transaction_status === "capture") {
      // Cari transaksi berdasarkan gatewayId [cite: 22]
      const txn = await prisma.transaction.findUnique({
        where: { gatewayId: order_id }
      });

      if (txn) {
        await TransactionService.processSuccessfulTransaction(txn.id);
      }
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}