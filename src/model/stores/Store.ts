import { Schema, model, Document } from "mongoose";
export interface storeInterface {
  address: string;
  name: string;
  _id: Schema.Types.ObjectId;
}

const storeSchema: Schema<storeInterface> = new Schema<storeInterface>({
  address: { type: String },
  name: { type: String },
  // waiters: [{ type: Schema.Types.ObjectId, ref: "Waiters" }],
});

export default model("Store", storeSchema);
