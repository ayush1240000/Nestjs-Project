export class BillResponseDto {
    billid: number;
    customerId: number;
    employeeId?: number;
    tableno?: number;
    amount: number;
    payment: string;
    createdAt: Date;
    updatedAt: Date;
  }
  