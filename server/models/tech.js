import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const techSchema = new Schema({
    name: { type: 'String', required: true },
    title: { type: 'String', required: true },
    content: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
    dateUpdated: { type: 'Date', default: Date.now, required: true },
    dateDeleted: { type: 'Date' },
});

export default mongoose.model('Tech', techSchema);
