import mongoose from "mongoose";

const HuntSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      ref:'User'

    },
    name: { 
            type: String,
            ref: 'User',
          },
    score:{
            type: Number,
            default:0
          },
    level:{
            type: Number,
            default:0
          },
    currentLevelClues:{
            type:Number,
            default:0
    }
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.models.Hunt || mongoose.model("Hunt", HuntSchema);
