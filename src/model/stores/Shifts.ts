import { Schema, model, Document } from "mongoose";
import { Db, ObjectId } from "mongodb";
export interface shiftInterface {
  date: string;
  section: number;
  waiter: ObjectId;
  store: ObjectId;
  shiftNumber: number; //for Grouping
  shiftTables: ObjectId[];
}
const shiftSchema = new Schema(
  {
    // name: { type: String },
    date: {
      type: String,
      required: true,
    },
    section: { type: Number, required: true },
    waiter: { type: Schema.Types.ObjectId, ref: "Waiters", required: true },
    store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    shiftNumber: { type: Number, required: true }, //for Grouping
    shiftTables: [{ type: Schema.Types.ObjectId, ref: "Party" }],
    // store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    // dailyData: { type: Schema.Types.ObjectId, ref: "DailyData" },
  },
  {
    virtuals: {
      lastPartyTaken: {
        get() {
          return this.shiftTables[this.shiftTables.length - 1];
        },
      },
    },
  }
);

// shiftSchema.pre("save", async function (next) {
//   const existingShift = await this.collection.findOne({
//     date: this.date,
//     shiftNumber: this.shiftNumber,
//     section: this.section,
//   });
//   if (existingShift) {
//     next(new Error(`${this.section} is already taken`));
//   } else {
//     next();
//   }
// });
export default model("Shift", shiftSchema);
