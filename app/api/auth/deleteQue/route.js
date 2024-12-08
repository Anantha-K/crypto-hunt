import connect from "@/db";
import Level from "@/models/Level";
import User from "@/models/User";

import { NextRequest, NextResponse } from "next/server";

connect();

export const DELETE = async (NextRequest) => {
    try {
      const result = await User.deleteMany({});
      // const result = await Level.deleteMany({
      //         levelNumber: { $gte: 22 } // $gte means "greater than or equal to"
      //       });
        
      return NextResponse.json({ 
        message: "All users deleted successfully", 
        deletedCount: result.deletedCount 
      });
    } catch (error) {
      return NextResponse.json({ 
        error: "An error occurred while deleting users" 
      }, { status: 500 });
    }
  };


// import connect from "@/db";
// import Level from "@/models/Level";
// import { NextRequest, NextResponse } from "next/server";

// // Connect to database
// connect();

// export const DELETE = async (NextRequest,NextResponse) => {
//   try {
//     // Delete all levels where levelNumber is greater than or equal to 22
//     const result = await Level.deleteMany({
//       levelNumber: { $gte: 22 } // $gte means "greater than or equal to"
//     });

//     if (result.deletedCount === 0) {
//       return NextResponse.json({
//         message: "No levels found to delete",
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: `Successfully deleted all levels from number 22 onwards`,
//       deletedCount: result.deletedCount
//     });

//   } catch (error) {
//     console.error("Error deleting levels:", error);
//     return NextResponse.json({
//       error: "An error occurred while deleting levels"
//     }, { status: 500 });
//   }
// };