import mongoose from "mongoose";
export declare const contact_collection: mongoose.Model<{
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    added_at: NativeDate;
    user_id: string;
    contact_id: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=contactschema.d.ts.map