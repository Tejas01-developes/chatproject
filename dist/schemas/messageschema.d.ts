import mongoose from "mongoose";
export declare const message_collection: mongoose.Model<{
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
}, mongoose.Document<unknown, {}, {
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    message: string;
    from: string;
    message_id: string;
    to: string;
    send_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=messageschema.d.ts.map