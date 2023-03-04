export class OrderPaidEvent {
  name: string;
  userId: number;
  description: string;
  contructor(name: string, userId: number, description: string) {
    this.name = name;
    this.userId = userId;
    this.description = description;
  }
}
