// ===== Enhanced Mongoose Model: travlr.js =====
// Goals for enhancement (portfolio-ready):
// - Strong typing for numeric fields (length, perPerson)
// - Required fields with clear messages
// - Uniqueness + compound + text indexes
// - Input hygiene (trim), boundaries (min/max), and custom validators
// - Helpful virtuals and clean JSON output
// - Backward-compatible collection/model name

const mongoose = require('mongoose');

const ALLOWED_IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

function hasAllowedExt(filename = '') {
  const lower = String(filename).toLowerCase();
  return ALLOWED_IMAGE_EXT.some(ext => lower.endsWith(ext));
}

const tripSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      trim: true,
      unique: true,           // fast exact lookups, prevents dup inserts
      index: true
    },
    name: {
      type: String,
      required: [true, 'Trip name is required'],
      trim: true,
      index: true
    },
    length: {
      type: Number,
      required: [true, 'Trip length (days) is required'],
      min: [1, 'Trip length must be at least 1 day'],
      max: [365, 'Trip length must be less than or equal to 365 days']
    },
    start: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: (d) => d instanceof Date && !Number.isNaN(d.getTime()),
        message: 'Start must be a valid date'
      },
      index: true
    },
    resort: {
      type: String,
      required: [true, 'Resort is required'],
      trim: true
    },
    perPerson: {
      type: Number,
      required: [true, 'Price per person is required'],
      min: [0, 'Price must be a positive number'],
      // two decimal places max (e.g., currency)
      validate: {
        validator: (n) => Number.isFinite(n) && Math.round(n * 100) === n * 100,
        message: 'Price must have at most two decimal places'
      }
    },
    image: {
      type: String,
      required: [true, 'Image filename is required'],
      trim: true,
      default: 'default-trip.jpg',
      validate: {
        validator: hasAllowedExt,
        message: `Image must end with one of: ${ALLOWED_IMAGE_EXT.join(', ')}`
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long']
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        // Normalize id field for APIs / front end
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
  }
);

// ---- Indexes ----
// Common read pattern: upcoming trips sorted by price for deals
tripSchema.index({ start: 1, perPerson: 1 });
// Text search across user-facing fields
tripSchema.index({ name: 'text', description: 'text', resort: 'text' });

// ---- Virtuals ----
tripSchema.virtual('end').get(function () {
  // derive end date based on start + length (days)
  if (!this.start || !this.length) return undefined;
  const end = new Date(this.start);
  end.setDate(end.getDate() + Number(this.length));
  return end;
});

tripSchema.virtual('isUpcoming').get(function () {
  return this.start && this.start.getTime() > Date.now();
});

// ---- Model ----
const Trip = mongoose.model('trips', tripSchema);
module.exports = Trip;
